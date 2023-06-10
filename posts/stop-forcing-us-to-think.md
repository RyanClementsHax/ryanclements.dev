---
bannerAlt: man rubbing eyes by @@towfiqu999999 on Unsplash
publishedOn: 2023-06-10T04:00:00.000Z
description: >-
  The article discusses the hidden, negative impact of cognitive overload in
  software engineering and suggests ways to combat it.
title: Stop Forcing Us to Think
---

Our trade moves at the speed of `git push` and man is it mind numbingly fast. To keep up, we have to constantly learn new languages, frameworks, paradigms, and libraries, else we risk job security and relevancy. The firehose of information we must digest is easily overwhelming and overloading our brains noticeably has a negative impact on productivity. This is known as “cognitive load”.

It isn’t just a problem for university grads trying to pass their mid terms or established engineers looking to branch into different problem spaces. It is a problem on every team, everywhere. Think about it. How many different things does a new engineer have to know to safely make a change to any of your codebases without supervision 👀?

If you’re like me, you’ll have many repos using many different technologies, patterns, and frameworks. Because of entropy, pressure, deadlines, turnover, mistakes, and shortsightedness to name a few causes, after some time every repo feels like an entirely new ~~jungle~~ ecosystem each with it’s own list of caveats and traps to keep in mind when making any simple change. Making a change under these conditions is _hard_ because of the cognitive load forced onto any single engineer.

Psychological studies have shown that cognitive load can lead to increased stress and reduced performance. When our brains are overloaded with information, we tend to make more mistakes, work slower, and feel more anxious. In software engineering, this can result in bugs, delays, missed deadlines, and, when left unchecked, produce massive balls of mud.

## My experience

I recently experienced the consequences of cognitive load on my team. It showed me that cognitive load has consequences even on a small scale like a single code base or module.

I’m currently working on an Android project for FireTV. My team doesn’t have a whole lot of Android expertise so when I joined the team, one of my goals was to build this up. I was determined to just do what everyone else is doing ™️. I threw a ton of patterns at the code base expecting a “pit of success” to follow. I even created workshops and meticulously reviewed pull requests for correct usage.

Now it’s a year later and the promises of “cleaner”, more “maintainable” code don’t seem to be panning out. My team still has a difficult time avoiding bugs and finding out where to best organize logic. Why is it that despite all of the fancy libraries and patterns, it is so easy to make a mess? In reflection, the architecture I laid out put too much load on one person.

Android has a troubled past. Due to short sighted design decisions, programming an Android app is _hard_. It forces the programmer to think about way too many edge cases e.g. foregrounded, backgrounded, low memory killed, recycled views etc. What’s worse is that we couldn’t use any of the bleeding edge tech designed to alleviate these problems because our app was too old (that’s a story for another time).

What I failed to do was create the _right_ guardrails to reduce the cardinality of states their code would have to execute within. In other words, _I didn’t address the cognitive load Android inherently forced onto the developer_. In some ways, I added more because now the team needed to learn the differences between all the different design patterns.

If I could turn back time, I would have focused far more on creating intelligent primitives - building blocks if you will - that hide complexities. Smart platforms, libraries, and frameworks all do this. Consider how brilliant Linux’s “everything is a file” mindset is. One, dead simple api that allows developer to focus on their code, not avoiding bugs imposed on them silently.

## What should we do?

After this experience, I’m convinced the best medicine for cognitive load is to ruthlessly simplify. Here are a few key tips for doing so.

### Design intentionally and standardize

Limit the number of design or architectural patterns engineers have to learn to maintain their systems. By standardizing on a small set of patterns, engineers can become more proficient and efficient in using them, reducing cognitive load and minimizing the risk of errors. It is also important to regularly evaluate the usefulness and relevance of these patterns and retire those that are no longer necessary or effective.

Be VERY cautious adopting new patterns or tech knowing each one has a learning curve. Unless it provides serious value, consistency in the code often provides more value than some wizz-bang feature of the hottest new library.

Be skeptical of demos. \*\*\*\*It’s easy to get carried away with the “hello world” demo of some tech. Don’t fall for this! Build proof of concepts for whatever you are considering using. If you haven’t used a tech in frustration, you haven’t truly used it.

### Automate quality

If you can’t remove cognitive load, attempt to break the build when edge cases aren’t considered.

For example, you could write tests or even express correctness using your language’s type system if possible.

Lean heavy into the use of static code analyzers, formatters, and linters. It doesn’t matter exactly how you configure these tools so long as they enforce _consistency_. I’d recommend setting these as strict as possible personally.

Good intentions aren’t good enough. Engineers don’t have the discipline or mental capacity to be trusted to write code consistently, or remember all of the edge cases. The force protecting simplicity must be stronger than the force of hungry product owners and tight deadlines. Deployments are always rushed, and we never “get back around to it”.

### Boring is good

It’s ok to adopt the boring tech 😉. It typically means the rough edges have been smoothed over and there’s plenty of community help to guide proper usage.

### Encourage learning

Promote a culture of continuous learning rather than expecting engineers to learn everything all at once. This means encouraging engineers to learn gradually by providing them with opportunities for training, workshops, and mentorship.

However, don’t expect to be able to adopt something new just because you had your team “trained” for a few hours. Good learning takes time. Don’t rush it else you worsen the cognitive load.

Don’t be afraid to try new tech, but limit the amount of concurrent learning a team does at any given time. When engineers are forced to learn too many new technologies or frameworks at once, the likelihood of accidental complexity increases since it also introduces the likelihood of screwing up the integration between the techs.

## Conclusion

The fast-paced nature of software engineering can lead to cognitive overload, which has negative consequences on productivity and can result in bugs, delays, missed deadlines, and other problems. To combat this, it is important to ruthlessly simplify and limit the number of design or architectural patterns engineers have to learn. Engineers should also be encouraged to learn gradually through training, workshops, and mentorship, and the adoption of new technologies should be done carefully to avoid introducing accidental complexity. By following these tips, teams can reduce cognitive load, improve their overall productivity, and hopefully ship something we’d be proud of when handing it off to someone else to maintain.
