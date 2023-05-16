---
bannerAlt: checklist by @glenncarstenspeters on Unsplash
updatedAt: 2023-05-16T00:23:08.733Z
publishedOn: 2023-04-01T04:00:00.000Z
description: >-
  Testing techniques like mocking are often overused, but can be justified. In
  this post I break down what justifies such techniques.
title: Justifying Mocking
---

I'm not a huge fan of mocking as my [previous post on the testing totem pole makes clear](you-probably-dont-need-mocking). I find it, and other test simplifications like it, to take away from the value of the test being written. It can cause tests to become annoying maintenance pests that provide no more value than to remind you to update your tests when you make changes to the code.

I get why it is so common though. _It's so easy, fast, and cheap_, three great qualities to have when you're under the gun to deliver. Since deadlines in this industry seem to never loosen, the effect snowballs. The pattern then seeps into our muscle memory and before we know it, we are mocking return values on fields of simple data classes. I also recognize that some code _needs_ mocking. Preventing undesired side effects from legacy code is one great use case. Controlling the return value of your language's version of `Date.now(){:js}` is another.

One junior engineer named David that I work with fully aware of my opinions on mocking was caught off guard by this nuance when I praised the use of mocking in one of his pull requests. He expressed his confusion on when to reach for mocking. The question gave me pause. I didn't have a ready answer. All I could respond with was something vague. That got me thinking for weeks......what are the justifications for mocking? 🤔

I'd like to answer this, but a few steps removed. I believe the proper question to ask is, "what are the justifications for _test simplifications_?" The most valuable test is to verify behavior in production and every technique we have in some shape or form _simplifies_ that exact test often trading off fidelity for some useful property like determinism or speed. These techniques include preproduction environments, integration tests, fakes, and mocking to name a few. I go over a personal toolbox of them in [my previous post](you-probably-dont-need-mocking) I called the Testing Totem Pole.

So, David, here is your answer many, many weeks too late. Test simplifications are justified when:

- You want to avoid side effects
- You want to avoid nondeterminism
- The real test is too dangerous to justify
- The real test is too slow to be valuable
- The real test is too expensive to write or maintain

Now let me explain.

## You want to avoid side effects

This is one of the go-to examples engineers often provide to explain a simplification. It often is explained, "You don't _actually_ want to make a payment when testing payment logic. Do you?" This is a valid concern. Side effects like these make the test undesireable to run. I certainly don't want to make a payment every time I run the test!

Not all side effects alone justify simplifications though. One example is writing to a database. If the database is for testing purposes only and you can ensure isolation between tests using techniques like snapshots or multiple databases, why not write to it during your test? You exercise so much more code when you use your full stack. As I've said before...

> A test's value is the reliability to which it fails if a behavior depended upon in production is no longer present in the exercised system, code base, unit, etc.

If possible, test your code, by using it like you will in production. This includes the database! Obviously, this can run into other problems. More on that later.

## You want to avoid nondeterminism

When writing tests, it's valuable to depend on them executing in the same way with the same result every time you run them. This property, called determinism, eases debuggability and increases trust in the test suite.

Writing date/time logic in code is frustrating. It's only topped by writing tests for that logic given time is a source for nondeterminism. I recently tripped over [a timezone issue when running deno's standard library tests](https://github.com/denoland/deno_std/pull/3295). If your application is sensitive to time, you definitely want to reach for a simplification to control it. Another example is when a part of your code uses random number generation like in video games.

## The real test is too dangerous to justify

It is unlikely that you'll be able to justify testing a region outage or critical data loss if you don't have the proper mechanisms to recover if something goes wrong. These things are valuable to test, and often are. [Netflix's SimianArmy is one popular chaos engineering tool](https://github.com/Netflix/SimianArmy). Not all teams are ready for this testing though. Consequently, if you can't guarantee the safety of mission critical services or data, you should look for simplifications.

## The real test is too slow to be valuable

If you're developing a feature, testing in production sounds great, but deploying and testing takes time. Even if you have the perfect test suite, if it is large, running it can be seriously disruptive to a developer's productivity when they want to try different things to make a feature work or find the cause of a bug. Fast feedback loops are important. It's why every serious front end tool aims to support [hot module reloading](https://webpack.js.org/concepts/hot-module-replacement/); the seconds gained from not having to restart your development server add up! Even with new fancy, new, e2e tools that promise fast tests with high fidelity, certain tests can still take too long and thus justify simplifications.

## The real test is too expensive to write or maintain

As promised, the database example is coming back. Using a real database when testing is great, but setting up a framework to performantly isolate tests from each other while executing the database takes a lot of thought.

I once did this when testing repository code with a live SQL Server instance. I separated the tests from each other by instantiating the server with multiple catalogs (SQL Server's term for logical databases on the server), each seeded and snapshotted to reset between test runs. Each test file reserved a catalog instance before running its tests and released the instance when finished.

The code worked beautifully and gave us great confidence when making database changes, but this came at the cost of writing something of a "metaframework" on top of the test runner we were using. This "metaframework" is yet another thing we have to maintain when all we want to do is write application code.

This was a decent tradeoff in that case since most of our business logic was database logic, but other projects might not be able to justify this level of effort especially if the project's database needs are simple. All of this is to say, writing the "perfect" test might come with a maintenance burden. Heck, you might not even know _how_ to write the "perfect" test, and that's ok! It's totally fine to do your best and move on. I certainly don't expect everyone using SQL Server to understand the dark arts I had to perform just to get snapshotting performant. I didn't when I started 😁.

## Conclusion

So, there you have it, David. A real answer to your very good question. Test simplifications are justifiable and, sometimes, even needed. If you read my previous post, this serves as a checklist of sorts to know when to reach for a lower rung on the totem pole. If you don't like the totem pole I proposed or didn't read that post, that's ok. Just know that it's preferrable to start with the highest fidelity test, then _justify_ your way down to the most valuable test you can write for your project.

That's all for now. Bye! 👋🏻
