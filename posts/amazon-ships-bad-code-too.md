---
bannerAlt: burning building @davehoefler on Unsplash
description: 'Find out why even a top tier tech company still ships bad code'
title: Amazon Ships Bad Code Too
---

> When I got to Amazon, I thought engineering would be like a well oiled battle ship; ordered and tidy. Turns out it is more like a pirate ship; messy and chaotic. - Unknown Amazon principle engineer (paraphrased)

Amazon is a forerunner in software development, only tolerating the best and brightest engineers to craft amazing software pushing the whole industry forward. Everything there must be perfect, right? How could it not be?

I don't know how many people fall into the same line of thinking, but I certainly was one of them before I joined Amazon. In orientation, during my first few days working for Amazon, I came by the above quote, but I didn't think much of it until I started work on my team's code base. Sphagetti everywhere. Good thing I like Italian.

I thought maybe this is just my team, but no, its present on every team, some teams more than others, some code bases more than others. Was I fooled into thinking that Amazon truly [Hires and Develops the Best](https://www.linkedin.com/pulse/20141117144807-75052-hire-develop-the-best-amazon-leadership-principle-5)? If Amazon can't get it right, could I expect much better elsewhere?

There must be some reason! And after some time of working in Amazon's culture, I found that the problem wasn't the code, _the problem was me_. I needed to change the way I thought about bad code. Let me explain.

We as engineers tend to get caught up into an ivory tower notion of "clean and maintainable" code. It's only "good" when it is perfectly readable and portrays a feel of "academic perfection". Engineers at Amazon challenge this definition. Code is only "good" when it delivers value to customers. Period. In other words, Amazon thinks of good code not as a developer-focused art show, but infrastructure for amazing customer-centric experiences. Once I was viewing code quality from this view point a few things stood out to me.

Shipping prototypes is more important than shipping the wrong thing. Because Amazon cares so much about delivering value to its customers, early feedback from customer behavior is far more valuable than being feature complete especially as few producs (in any company) get everything right the first try.

Second, any maintenance efforts, either to fix/clean code now or make the code easier to fix/clean in the future (i.e. upgrades, migrations, refactorings, etc) need to be justified from the customer's view point. The customer doesn't care if your code is easy to read, uses the latest framework, or uses the hottest programming language; the customer cares about the value they get from using the product.

Additionally, I realized that not every quality issue should be treated equally. Amazon has a concept called a [1 way door decision](https://shit.management/one-way-and-two-way-door-decisions/) that I'll be borrowing from here. This concept describes decisions you can't turn back from once their made as opposed to 2-way door decisions which you can turn back from at any time. The distinction is designed to prevent spending too much time on things that shouldn't block velocity. Architecture and large refactors are often 1-way door decisions and thus deserve more careful attention. Simple refactorings and test coverage are often 2-way door decisions. In this light, I must conclude that some code cleaning can and should be deferred. I should be happy with shipping an imperfect product.

Does this mean that Amazon's code is a maintenance nightmare? No. Well, I can't speak for every team. Amazon engineers certainly aren't perfect. What I can say is that, first, Amazon builds quality into the system as to allow engineers to fall into the [Pit of Success](https://english.stackexchange.com/questions/77535/what-does-falling-into-the-pit-of-success-mean) thereby lowering the frequency of quality problems. For the problems guardrails cannot prevent, Amazon quarantines. Mostly this comes out of the box with microservice architecture. Spaghetti has a very difficult time slithering across a network boundary. With these simplifications, Amazon empowers teams to make the right decision for the customer. Sometimes this means cleaning code. Other times this means shipping without polishing. In the end, there will always be unclean code as not all problems are worth fixing.

This by no means is an endorsement to not introduce quality in code. It would be the software equivalent of advising dropping out of college because Bill Gates did. When Bill dropped out of Harvard, he did so intentionally, weighing the tradeoffs and saw that founding Microsoft would be a better use of his time. Similarly, if we as engineers decide not to invest in quality when working on a system, we should do so _thoughtfully_ and _carefully_. Amazon has a culture of "Insisting on the Highest Standards" which, in part, means we will block shipping a feature if it doesn't meet a standard of high quality, but the standard is _from the perspective of the customer_.

That last part is the key to all of this. The work we do should be valuable to our _customers_. That could mean upgrades, test coverage, or refactors, but as much as I am a stickler for keeping a "clean" and "maintainable" code base, I can't justify such stringent versions of this position anymore given the opportunity cost of not working on more valuable items, the 2-way door nature about many of those decisions, and the safeguards in place for not spreading the problems caused from the lack of quality.

In short, I've had to enrich my perspective on the purpose of code - to deliver value. All decisions should be made from this vantage point. Once I made this mental shift, I began to see the loose spaghetti in the context of bento boxes - compartamentalized code bases (maybe with a few leaks in between 😁) working as engines of value and products of intentional decisions. Perhaps the code we ship isn't bad at all?
