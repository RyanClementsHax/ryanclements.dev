---
bannerAlt: spilled ice cream cone @pawelj on Unsplash
publishedOn: 2023-10-30T04:00:00.000Z
description: >-
  Want to know some tips on how to learn things really quickly as a software
  engineer? Read to find out.
title: How I accidentally become the team expert in less than a month (part 1)
---

Big words. Little time. Let me explain. I've been blessed with many different experiences in my career so far. I've done React based internal websites for 100 users and Android FireTV apps for 100 million users just to name two extremes. Regardless of what I'm working on, I've noticed that in each of my experiences, I ramp up quickly in the tech used - very quickly, typically within a month.

My current team was the best example where I joined knowing absolutely nothing about Android, but after about a month, I was guiding the team on Android best practices along with designing the UI architecture strategy.

Funny enough, I didn't think anything of it. It was only after several occurrences of stumbling into the team "expert" role, and bewildering some of my teammates with the speed at which I tripped into the role did I start to start asking why. I'd like to claim that I'm just galaxy-brained, but the real reason is far more mundane. It is the byproduct of my every day habits.

Again, I'm NOT special. I'm not some coding prodigy or 4D chess playing grandmaster. I'm an average software engineer who loves what he does. In the spirit of sharing knowledge (and at the same time proving my previous point), I'd like to list these habits. What you'll find not only is how simple they are, but how anyone of any experience level can find value in them. You might even find them fun 🤗.

## Learn 30min every day

This is probably one of my most valuable habits. I take 30 minutes every day on company time (yes you read that right, company time) to learn something. Watching conference talks, reading articles, and diving into open source software are my favorite things to do in this time. The point is to push yourself out of the box your regular work draws around you, exposing you to new ways of thinking, or investing in a skill you want to build.

<aside>

This habit works not only for the obvious way, dedicated time for exploration, but also because _science_ 🧪. Two ways this habit leans into the way our brains work is by spacing the learning, a learning technique called "spacing" (unsurprisingly) and inserting other topics between learning sessions, a learning technique called "interleaving".

Injecting periods of forgetting between learning sessions increases retention because it forces you to recall knowledge not stored in your working memory while also giving your brain time to digest the information. When working on your actual work in between, you're practicing the content your job requires of you. In other words, you're "interleaving" learning new things with practicing/learning existing things. This gives you a baseline to compare the new content against further increasing retention.

Science is cool, huh?

</aside>

I make a point to stress that this should be on the company's dime. Part of being a software engineer is continuously learning. Even if what you're learning isn't directly applicable to your project, you're still building a richer understanding of your field in your head. It is equally important to know how to use a technology well as it is to know when to not use it at all. You'll never know the latter half unless you expose yourself to other ways of doing things. Plus, doing this on company time avoids the guilt of feeling the need to do this off the clock. Work life balance is important.

Everyone's learning needs are different so tune this to your particular situation. When needing to learn a new skill quick, this time can be focused on that one topic, but in between the need to learn, you can open this time up to a broader range of topics in preparation for the future. I prefer to use this time on the long game by learning things outside of my current scope of work as to allow for spontaneous ramp up when the duty calls, but use it however you like. It's hard to waste as long as you're learning!

### 💡 Tips

- The beginning of the day, for me, is the best time to schedule the 30 minutes because it avoids interruptions and the priorities of the day haven't set in yet.
- I don't normally code in this time because I find it hard to be productive coding in just 30 minutes, but if that's not a problem for you, go for it!
- If you want, you can pool some of the time for longer learning sessions.
- Avoid looking at your notifications before starting this 30 minutes. It hurts your focus during that time and serves as a temptation to answer "just a few" messages before starting.
- Track your time. It helps keep you honest.

## Use it for real

One of the big mistakes I made when starting as a software developer was to over rely on tutorials or courses to provide me with the skills I needed. They commonly run into two problems. First they're overly simplistic, and they don't reinforce the back half of the learning process - recall. Instead, focusing on learning concepts in the context of real world(ish) scenarios is where the real learning is discovered.

Courses and tutorials are fantastic for making the first step to learning a new skill. Although, they, needing to simplify concepts to ensure easy learning, as a necessary consequence remove the real world complexity. Any shiny new tech can show you how little effort it takes to `printf("Hello, World!")`, but you're job isn't to print `Hello, World!` to a console! Your job is to deliver business value!

Real applications need the tech to be testable, deployable, maintainable, feature rich, easily learnable, integrate with other technologies, etc. Your goal when learning a new tech should be to find how well it fits into the end to end story of the application lifecycle and to burst the hype bubble surrounding it. A great way to know if you've sufficiently learned a tech well is if you've used it in frustration, when you've hit the outer limits of the value it provides.

Courses and tutorials tend not to reinforce recall either. It can feel like you know a technology just by reading all of the docs, but familiarity with the learning materials doesn't make up for being able to apply the content to a new problem without help. This is a separate skill that needs to be intentionally practiced.

My recent learning of Jetpack Compose, an upcoming Android UI library, is a great example of these concepts. I started with tutorials to get oriented. It felt like I had a grasp of the technology but knowing the illusion of mastery tutorials present, I followed up by writing a somewhat "real" app in it. Specifically I wrote a clone of the FireTV Fire Channels app. When it came to writing my first line of code, it was like I forgot everything (sound relatable?). Knowing this was just part of the process, I pushed on. After about a few sessions of working on it, the content learned in the tutorials set in. Trying to integrate the library with other tools quickly showed pain points. I didn't even fully clone the app when I found enough value to consider myself up to speed.

<aside>

Quality learning is uncomfortable and takes a while. This is because real learning is bolstered by "desirable difficulties" as the research calls them. These are mechanisms that force you to try. Examples include trying to solve the problem before given the answer, or learning content out of order.

</aside>

In short, don't consider yourself done until you do something substantial with it. The more "real" the better. Also, you get faster at this the more techs you ramp up with so don't be discouraged if you are slow at first.

<!-- markdownlint-disable no-duplicate-header -->

### 💡 Tips

<!-- markdownlint-enable no-duplicate-header -->

- When choosing a real world app, implement a small portion of something you use.
- Implement the real world app up until you see its pain points.
- Find courses that teach with real world examples ([epicreact.dev](https://epicreact.dev/) is one such resource).

## Learn how it works

I personally get antsy when I don't know how a technology works. I don't like the veneer of "magic" some libraries provide. To me, I want to have a general understanding of how things work under the hood because it is either I put in the work to understand it upfront, or I'm forced to understand it months later when it suddenly doesn't work the way I expect it to. Heaven forbid I build the rest of my stack on a technology that severely limits my future options and only find out when it is too late.

This paranoia forced me to peek under the hood of many technologies over the years. Inadvertently, I built a rich mental model for how software works in general. This had a two fold effect. I first found myself digesting new technologies much quicker, and second found myself more effective at my current work.

The more you know, the more likely you are to relate a new concept to something you already understand. Think about how much easier it is to learn another language when you already know two as opposed to one. Multiple perspectives on the same problem have a compounding effect. This is the same when learning new tech. You'll find yourself picking up technologies much faster the more you know. For example, after I learned React internals, Next.js and Storybook internals weren't nearly as difficult to understand.

The more you know, the more likely you can predict the future. The more projects you study, the more likely you'll be able to look around corners on the current projects you work on. After studying so many projects, I found myself finding more bugs in code review, writing better tests, and creating cleaner abstractions. This was all because when you study many implementations, whether you know it or not, you pick up on different ways to solve a problem. You learn what works well, what doesn't, and what options you even have at your disposal. You can't keep yourself from seeing those same patterns on your current projects.

<aside>

The common theme here is a concept called "variation". The more angles you have on a concept, the richer your model becomes and the more effective you become at problem solving.

</aside>

<!-- markdownlint-disable no-duplicate-header -->

### 💡 Tips

<!-- markdownlint-enable no-duplicate-header -->

- Compare the implementations of projects that are loved vs projects that are hated.
- Clone the project, set a breakpoint, hit it, and step through the program to see how it executes.
- Find out where the "main" method is and start your analysis there. Every program has one.

## Conclusion (for now)

Ramping up quickly on a new skill or technology isn't a function of drinking more caffeine, reading more documentation, or shelling out more money on courses. It is primarily a function of consistent, deliberate practice and leaning into how your brain works. I strongly recommend reading [Make It Stick](https://a.co/d/gJJ1FNb) as a primer on how to learn like a pro. I promise, after a year of effort, you'll transform into a machine any team would die to have.

Next time, I'll go into the second part of what I do to learn so quickly.
