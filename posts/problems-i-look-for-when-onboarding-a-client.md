---
bannerAlt: man looking through binoculars @shaianramesht on Unsplash
publishedOn: 3/1/24
description: I've helped many teams with audits on their software. Here is what I look for and why.
title: Problems I look for when onboarding a client
---

As part of [Byte Bot, my software agency](https://ryanclements.dev/posts/starting-my-own-software-agency), I help software teams working with web technologies like Nextjs, Nuxt, and TypeScript ship qualtiy full stack solutions to their users. When bringing clients onboard, the first thing I do is audit their current system. I need to do this simply to understand what I'll be working on, but I also do this to break the team's group think.

When working on a project long enough, it's too easy to keep things the way they are because of learned helplessness or being unaware of other options. Being from the outside, I have the perfect vantage point to bring a fresh perspective. This perspective isn't conditioned by the organization's group-think. Typically what follows from this is breakthroughs in places they feel "stuck".

Since I recently had a successful audit of a new client and was able to bring them value in doing so, I'd like to share what I look for and why.

## Finding their "why"

I first seek to understand why the team exists in the first place. Software can only be evaluated relative to the reason why it exists and the value it provides others. This level sets my expectations and teaches me about their domain.

As an example, if I'm brought in to help a government team, asking why they exist will reveal a ton about the red tape these teams have to operate around. The awkward hacks you will then see in the software they build is better explained.

For startups I help, understanding the reason they exist and the value their teams contribute to overall organization goals shows you the market pressures, uncertainty, and cash flow risks they face. Reading the code in the light of that explains why you won't see so many tests - they're in experimentation mode!

One startup I helped, had a React front end. It was a single page application (SPA). In modern times, this is commonly frowned upon as they come with performance, SEO, and memory problems. That being said, they 👏 don't 👏 require 👏 a 👏 server 👏. You can build the sucker and chuck it in an S3 bucket and be done. Super cheap. Perfect, say, for startups with low cash flow and limited run way whose users don't care about performance, SEO, or memory.

Oddly enough, I also find them popular among backend developers who don't care about front end because their hosting complexity is lower. This just so happened to be the case with the aforementioned startup (part of the reason why he wanted to bring me on - frontends frustrate him 🤷‍♂️). The SPA allowed him to iterate faster because he didn't want to learn Next.js. That was 100% the right thing to do in my book.

Without the context, it is easy to write off portions as "bad" or "undisciplined". I've seen more than my fair share of software teams to know this isn't always the case.

Here are some helpful questions I use to learn their "why":

- Who uses your software?
- What are your organization's goals?
- How does your software contribute to your goals?
- Who are your stakeholders?
- How do you know you're doing a good job?
- If your software stopped working, who would complain?
- What alternatives were considered before creating this software and why didn't they work?

## Mapping out workflows

With a high level understanding, I now move a layer down. I like to map out the software's common workflows. For an order placement system, I like to put myself in the shoes of a customer. I then find how placing an order ripples through their system, the teams they affect, the services they touch and so on.

Some teams have this ready in the form of [Architecture Decision Records](https://github.com/joelparkerhenderson/architecture-decision-record) or similar documentation. If they don't I leave a note to recommend it in my final report.

I find talking with stakeholders to be very effective here. Not all organizations put software engineers close to users and their complaints. Product managers, call center employees, and sales people tend to have more valuable insights. They also sometimes are the actual users!

Talking with people closer to users lowers the risk of misperception brought from being too far removed from the actual problem. At the same time, you find out hacks and workaround THEY make around problems in the software or organization!

Once I map out the common workflows, I'm now in a position to understand how this piece of software contributes to the organization's goals - or how it should.

## Finding out what to look at

This may seem like a funny step. Normally teams bring me on to work on something specific, but after the previous two points, a proper analysis of the system requires looking at much more. Any piece of software always exists in an ecosystem. It has dependencies, dependents, environments, etc. I want to peek into that ecosystem.

The previous step sheds light on where many of these things are, but I like to ask about related projects too. What you get might surprise you.

One client I worked with had a Nuxt application that served content from a content management system (CMS). I mapped out the workflows and thought I understood where to look, but just to be sure I asked if this project was related to anything else.

It turns out they have DOZENS of mini applications they `iframe` into their site because of limitations in the CMS 🤯. What I found led to recommendations for monorepos as they had separate repositories for each individual mini-app.

## Diving into the code

Only _now_ do I start looking deep into code and related artifacts. Armed with my [spelunking tools](https://ryanclements.dev/posts/code-spelunking-how-to-dive-into-unfamiliar-code-part-1), I dive head first. Here is an abbreviated list of things I look at, broken into category.

Developer experience (DX)

- Does the project clone properly?
- Does the project build, run, and test without errors?
- What documentation exists?
  - Is it correct?
- Does the nomenclature in the code match the domain?
- Is the project debuggable?
- How easy is it to read the code?
- Is linting and formatting set up?
- Does the project use code review?
  - Is anything automated during code review?
- What IDE integrations are set up?

Deployments

- How up to date are it's dependencies?
  - Are any of these critical dependencies?
- Can any dependencies be removed?
- Can any of the functionality be better served by taking on an additional dependency?
- How is the project built?
- How complicated is its build system?
- How are deployments validated?
- How are database updates applied?

Testing

- How is the project tested?
- What kinds of tests?
- Do they all pass?
- Are they valuable or just busy work?
- Are they comprehensive?
- Do they test for accessibility?
- Are these run in the pipeline?

Security

- What is the security posture?
- Does it deal with sensitive data?
- Are there any laws applicable to the project?
- How are secrets managed?
- How are users managed?
- How is data managed?

Performance

- What is the performance of the system?
- Does it even matter?
- Is this tracked?

Operations

- What metrics are tracked?
- What alarms are set?
- How do you know when crap hit the fan?
- Are people woken in the middle of the night?
  - How often?

Project management

- How many bugs occur?
  - Where?
  - How critical?
- How is work managed?
  - Where?
  - Is this the same place you go to find updates on tasks?
- What workflow do you use?
- How is git set up?
- Is this project receiving active work?

Misc

- Do the developers actually like the project?
- What are common pain points developers have with the project?
- What are common pain points stakeholders have with the project?
- How are developers rewarded?
- How are managers rewarded?
- How do their results compare against competitors?

As you can see, its quite a lot, and this isn't even the full list! After answering these questions, I have a pretty good feel for the project and its weak areas.

If possible, I like to implement a fix or feature at this point. Working on an actual task helps me understand the repo in a deeper way. This isn't always available, but it is helpful when allowed.

## Results

The report writes itself at this point! I organize my findings into categories and rank their standing from 1 to 5, 1 being "fix now" and 5 being "stellar". It is up to my client's discretion to prioritize what makes sense to them.

Typically I voice problems that they already were at least somewhat aware of, but every time, I'm able to suggest novel solutions they've never thought of before. I love seeing their face when this happens.

For the client that used Nuxt, they were thrilled to learn about some of the best VSCode extensions for enhancing developer experience on top of some of the new Nuxt apis that would help them with performance problems they were seeing.

Now, I know a hell of a lot about web and full stack development, but half of the reason this occurs is because I'm from the outside and have seen tons of ways of doing the same thing!

## Conclusion

Outside perspectives are extremely valuable. They break through group-think and learned helplessness. They also open doors you didn't even know where there. They're so helpful that I have a process for using this in favor of my clients.

If you do something similar I'd love to hear from you. You can reach me at my [Twitter](https://twitter.com/ryanclementshax), [Linkedin](https://www.linkedin.com/in/ryan-clements-hax/), or [email](mailto:info@bytebot.io).

If you or anyone you know would like an audit on their software systems, let's [schedule a chat](https://bytebot.io/) or [email me](mailto:info@bytebot.io). I'd love to help you and your team ship great software and love the code bases they work in.
