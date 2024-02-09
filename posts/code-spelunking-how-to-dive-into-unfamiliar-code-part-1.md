---
bannerAlt: man in cave by @wandercreative on Unsplash
publishedOn: 2024-02-09T05:00:00.000Z
description: >-
  Ever have problems making sense of code you didn't write? I'll help you with
  proven techniques in this post.
title: 'Code spelunking: How to dive into unfamiliar code (part 1)'
---

Part of working as a software engineer, and specifically as a contractor like myself, is the reality of investigating code you didn't write. Be it you need to understand code a teammate wrote, are onboarding to a new project, or want to learn how a dependency works, you'll need to master maneuvering in unfamiliar territory. Let's discuss a few tricks you can use to help you.

## Categorize the project

First, understand the kind of project you're investigating. JavaScript frameworks are structured differently than personal websites or android apps. Knowing this gives you a rough lay of the land. It provides coarse understanding like how the build system may be set up, or where the "main" method is if there is one.

Let's take [Deno](https://github.com/denoland/deno) as an example. Looking at [its website](https://deno.com/), we can tell it is a JavaScript runtime [written in Rust](https://docs.deno.com/runtime/manual/references/contributing/building_from_source#rust). What does this tell us? You can start to make sense of it as a Rust project built and managed with [Cargo](https://doc.rust-lang.org/cargo/), the Rust package manager.

![Typical Rust and Cargo files can be seen in the root of the Deno project](cargo-and-rust-files.png)

We see evidence of that if you look at the names of [the root files](https://github.com/denoland/deno/tree/24bdc1de33494bc1619bfebea826ab08ffb74a01). You don't even need to know what they're for or be able to read Rust, but this shows us we should think of it as a Cargo/Rust project. This means simple Google searches like "Where are Rust dependencies declared?" or "Rust tutorials" are likely to help us answer questions we may have.

## Find the main method

Once you find the main method of a program, you can follow function calls and if statements until you get what you need. To run a Deno program, you'd write something like this in your terminal.

```bash
deno run main.ts
```

If our goal is to find the first line of code in Deno that runs `main.ts`, we should look for CLI (Command Line Interface) code.

Looking again at the root level files, look what we find! 👀👀👀

![The cli folder can be seen at the root of the Deno repo](cli-folder.png)

We find a folder named `cli`! Let's look in there. Behold! A `main.rs` file!

![The main.rs file can be seen within the cli folder](main-rs.png)

<aside>
This is one reason why we want to categorize the project before diving. `main.rs` is an [entry point convention for Cargo programs](https://doc.rust-lang.org/cargo/getting-started/first-steps.html).
</aside>

There we have it, [pub fn main()](https://github.com/denoland/deno/blob/24bdc1de33494bc1619bfebea826ab08ffb74a01/cli/main.rs#L303).

```rust title=cli/main.rs
pub fn main() {
  setup_panic_hook();

  util::unix::raise_fd_limit();
  util::windows::ensure_stdio_open();
  #[cfg(windows)]
  colors::enable_ansi(); // For Windows 10
  deno_runtime::permissions::set_prompt_callbacks(
    Box::new(util::draw_thread::DrawThread::hide),
    Box::new(util::draw_thread::DrawThread::show),
  );

  let args: Vec<String> = env::args().collect();

  // .... and so on
}
```

## Trust the naming

It's tempting to think that unfamiliar projects are written with cryptic, domain specific naming schemes you have no hope of understanding. This is true for some projects and unfortunately more common when those projects are behind corporate walls built by dysfunctional engineering teams. That being said, it has to have been understandable by _someone_.

After finding the main method, to find what you're looking for, trust the naming until you have reason not to. For open source projects this almost always pays off as they have incentive to make it easy to understand, else contributions won't be made.

From here, its just a matter of reading the code to find the path it takes to execute `deno run main.ts`. There's a [run_subcommand(flags).await](https://github.com/denoland/deno/blob/24bdc1de33494bc1619bfebea826ab08ffb74a01/cli/main.rs#L387) call that seems helpful. Turns out it is defined in the same file and there's a pattern matching case that [looks like this](https://github.com/denoland/deno/blob/main/cli/main.rs#L165).

```rust title=cli/main.rs
let handle = match flags.subcommand.clone() {
    // ..... other options .....
    DenoSubcommand::Run(run_flags) => spawn_subcommand(async move {
      if run_flags.is_stdin() {
        tools::run::run_from_stdin(flags).await
      } else {
        tools::run::run_script(flags, run_flags).await
      }
    }),
    // ..... other options .....
}
```

Following program execution further we can dive deeper.

1. Let's assume we don't know what `run_flags.is_stdin(){:rs}` means, we can follow both branches to get to [deno/cli/tools/run/mod.rs](https://github.com/denoland/deno/blob/24bdc1de33494bc1619bfebea826ab08ffb74a01/cli/tools/run/mod.rs#L21) and turns out both of those functions are defined here and do similar things.
2. They then seem to do a bunch of setup then make a call to [let exit_code = worker.run().await?;](https://github.com/denoland/deno/blob/24bdc1de33494bc1619bfebea826ab08ffb74a01/cli/tools/run/mod.rs#L74) which sounds a lot like what we're looking for.
3. Seeing [the worker is created a few lines above](https://github.com/denoland/deno/blob/24bdc1de33494bc1619bfebea826ab08ffb74a01/cli/tools/run/mod.rs#L71) with a call to `create_main_worker(main_module, permissions){:rs}` a search of that function name turns up with [one definition](https://github.com/denoland/deno/blob/24bdc1de33494bc1619bfebea826ab08ffb74a01/cli/worker.rs#L439).
4. It internally calls [create_custom_worker](https://github.com/denoland/deno/blob/24bdc1de33494bc1619bfebea826ab08ffb74a01/cli/worker.rs#L454) just below it.
5. It [returns a type of CliMainWorker](https://github.com/denoland/deno/blob/24bdc1de33494bc1619bfebea826ab08ffb74a01/cli/worker.rs#L656C8-L656C22) which after a search [is defined here](https://github.com/denoland/deno/blob/24bdc1de33494bc1619bfebea826ab08ffb74a01/cli/worker.rs#L136).
6. It has a [run method](https://github.com/denoland/deno/blob/24bdc1de33494bc1619bfebea826ab08ffb74a01/cli/worker.rs#L153) defined for it which is probably what we are looking for.
7. The body of the code seems to run [the event loop](https://github.com/denoland/deno/blob/24bdc1de33494bc1619bfebea826ab08ffb74a01/cli/worker.rs#L198) until [an error is received](https://github.com/denoland/deno/blob/24bdc1de33494bc1619bfebea826ab08ffb74a01/cli/worker.rs#L190) or [whatever this is](https://github.com/denoland/deno/blob/24bdc1de33494bc1619bfebea826ab08ffb74a01/cli/worker.rs#L206).
8. Finally, it [returns the exit code](https://github.com/denoland/deno/blob/24bdc1de33494bc1619bfebea826ab08ffb74a01/cli/worker.rs#L233).

<aside>
Note that a basic understanding of Rust is needed to dive this deep, but nothing was out of the realm of what could be Googled.
</aside>

With a basic understanding of the execution flow, but let's see how right it is.

## Set a breakpoint

Reading the code is a great way to get started, but nothing tops running the program to understand how it actually works.

Starting with the [Contributing page of Deno](https://docs.deno.com/runtime/manual/references/contributing/), we can learn how to clone, build, and run the program. Unfortunately it doesn't mention how to debug a binary, **but that's why we categorized it in the beginning!!!** It's just a Rust program!

I used [VSCode's debugging Rust guide](https://code.visualstudio.com/docs/languages/rust#_debugging) to figure out how to set a breakpoint and eventually got the following for `.vscode/launch.json`, the file responsible for debugging configurations.

```json title=.vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "lldb",
      "request": "launch",
      "name": "Debug deno",
      "cargo": {
        "args": ["build", "--package", "deno", "--bin", "deno"]
      },
      "args": ["run", "main.ts"],
      "cwd": "${workspaceFolder}"
    }
  ]
}
```

I the only other setup I did was create a `main.ts` file at the root of the repo with a simple `console.log("Hello, World!"){:js}` statement in it.

With everything set up I set a breakpoint and ..... _drumroll_ 🥁 ..... found one other key line.

```rust {16} title=cli/worker.rs
pub async fn run(&mut self) -> Result<i32, AnyError> {
    let mut maybe_coverage_collector =
      self.maybe_setup_coverage_collector().await?;
    let mut maybe_hmr_runner = self.maybe_setup_hmr_runner().await?;

    log::debug!("main_module {}", self.main_module);

    if self.is_main_cjs {
      deno_node::load_cjs_module(
        &mut self.worker.js_runtime,
        &self.main_module.to_file_path().unwrap().to_string_lossy(),
        true,
        self.shared.options.inspect_brk,
      )?;
    } else {
      self.execute_main_module_possibly_with_npm().await?; // 👈🏼 this one
    }

  // ... and so on
}
```

This line was the one actually responsible for executing the code within `main.ts`. If you follow the flow of execution it eventually [hands off execution to the deno_core crate to evaluate the module](https://github.com/denoland/deno/blob/49214d309fc373a80a02f57545131b15f7813a98/runtime/worker.rs#L606).

```rust {1-5, 7} title=runtime/worker.rs
/// Executes specified JavaScript module.
pub async fn evaluate_module(
  &mut self,
  id: ModuleId,
) -> Result<(), AnyError> {
  self.wait_for_inspector_session();
  let mut receiver = self.js_runtime.mod_evaluate(id); // 👈🏼 Right here
  tokio::select! {
    // Not using biased mode leads to non-determinism for relatively simple
    // programs.
    biased;

    maybe_result = &mut receiver => {
      debug!("received module evaluate {:#?}", maybe_result);
      maybe_result
    }

    event_loop_result = self.run_event_loop(false) => {
      event_loop_result?;
      receiver.await
    }
  }
}
```

Looking back at my original trace of the code, the code I found in point #7 above seems to handle clean up of some sort.

I could continue, but I think I've made my point.

## Conclusion

Diving into unknown code isn't as scary as others might make it out to be. I've shown that simple techniques can help you tremendously.

I demonstrated a simple example in this post, but it also can be used for answering harder questions. For example, I was able to use this to find [where the event loop is ticked in Deno](https://github.com/denoland/deno_core/blob/0f69f4cf974938bce0b583840fecbfee7b8a7e6d/core/runtime/jsruntime.rs#L1607). More specifically, it [probably happens on this line](https://github.com/denoland/deno_core/blob/0f69f4cf974938bce0b583840fecbfee7b8a7e6d/core/runtime/jsruntime.rs#L2215C5-L2215C26).

These techniques work best for open source projects or projects that are otherwise _somewhat_ intelligible. For corporate projects that don't have any incentives to make code understandable, you'll have to resort to other techniques, but more on that in a different post 😉.

Next post, I'll go over even more techniques, like one that helped me make [storybook-addon-next](https://www.npmjs.com/package/storybook-addon-next), the precursor of [@storybook/nextjs](https://www.npmjs.com/package/@storybook/nextjs) 👀.
