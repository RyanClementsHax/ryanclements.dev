---
bannerAlt: burning building @davehoefler on Unsplash
description: 'Find out why even a top tier tech company still ships bad code'
title: Amazon Ships Bad Code Too
---

> When I got to Amazon, I thought engineering would be like a well oiled battle ship; ordered and tidy. Turns out it is more like a pirate ship; messy and chaotic. - Unknown Amazon Principle engineer (paraphrased)

Amazon is a forerunner in the software development, only tolerating the best and brightest engineers to craft amazing software pushing the whole industry forward. Everything there must be perfect, right? How could it not be?

I don't know how many people fall into the same line of thinking, but I certainly was one of them before I joined Amazon. During orientation, I came by the above quote, but I didn't think much of it until I started work on my team's code base. Sphagetti everywhere. Good thing I like Italian.

I thought maybe this is just my team, but no, its present on every team, some teams more than others, some code bases more than others. Was I fooled into thinking that Amazon truly [Hires and Develops the Best](https://www.linkedin.com/pulse/20141117144807-75052-hire-develop-the-best-amazon-leadership-principle-5)? If Amazon can't get it right, could I expect much better elsewhere?

There must be some reason! And after some time of working in Amazon's culture, I found that the problem wasn't the code, the problem was _me_. I needed to change the way I thought about bad code. Let me explain.

We as engineers tend to get caught up into an ivory tower notion of "clean and maintainable" code. It's only "good" when it is perfectly readable and portrays a feel of "academic perfection". Engineers at Amazon challenge this definition. Code is only "good" when it delivers value to customers. Period. In other words, Amazon thinks of good code not as a developer-focused beauty pageant, but infrastructure for amazing customer-centric experiences.

Once I was viewing code quality from this view point a few things stood out to me. Shipping prototypes is more important than shipping the wrong thing. Because Amazon cares so much about delivering value to its customers, early feedback from real customers is far more valuable than being feature complete especially as few producs (in any company) get everything right the first try. Any maintenance efforts, either to fix/clean code now or make the code easier to fix/clean in the future (i.e. upgrades, migrations, refactorings, etc) need to be justified from the customer's view point. The customer doesn't care if your code is easy to read, uses the latest framework, or implements object oriented programming perfectly; the customer cares about the value they get from using the product.

Does this mean that Amazon's code is a maintenance nightmare? No. Well, I can't speak for every team. Amazon engineers certainly aren't perfect. What I can say is that Amazon engineers build quality into the system as to prevent the all too familiar debate between quality and speed as well as build clear boundaries between systems so quality problems, when they do arise, don't spread viraly.

Amazon sees problems in engineering as consequences of systems. If an engineer is faced with the decision to ship poor code now or ship better code later, we stop to ask, "Why is that engineer forced to make that decision in the first place?". After decades of asking the [Five Whys](https://en.wikipedia.org/wiki/Five_whys), Amazon has come to build a rather amazing developer platform that bakes in best practices to everything an engineer might have to do like creating a new service, running load tests, or deploying software. It has its flaws, but it certainly eliminates _many_ of these decisions to allow the engineer to focus on their application code.
