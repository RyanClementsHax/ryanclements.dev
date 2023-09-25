---
bannerAlt: people working with computers @charlesdeluvio on Unsplash
publishedOn: 2023-09-25T04:00:00.000Z
description: >-
  Here I list the most common antipatterns I see PR reviewers make and how to
  fix them at their core
title: The 5 Most Common PR Reviewing Antipatterns I see
---

As mentioned in the [previous post](https://ryanclements.dev/posts/the-5-most-common-pr-authoring-antipatterns-i-see), pull request speed has a big impact on team velocity and as such we should be vigilant to eliminate waste in the process. In my personal experience, I see most of the problems happen before the PR is opened, but there are still plenty of things that can go wrong on the reviewing side. Below are the 5 most common problems I see on the reviewer side of PRs (your experience may differ) and what to do about them.

## #5 Incorrect feedback

Providing feedback is fantastic. It allows people to grow and quality to improve...provided it's correct. Not only does incorrect feedback lead to longer PR times, but it incurs back and forth between the author and mistaken reviewer to debug the reviewer's understanding, or worse, it leads to a poor change being made.

There are many reasons that lead to incorrect feedback, so listing out all the ways to fix this issue would be tedious to say the least. I'll at least give a few ways to address the issue from my experience.

1. **Make the changes easy to review:** This is more so a responsibility of the author, but boring PRs are good PRs. They reduce the risk of confusion and poor feedback.
2. **Identify confusion early:** Incorrect feedback will always happen, and when it does, I find it effective to take the conversation off of the PR and into messaging or a face to face meeting.
3. **Avoid silos:** It is easy to be mistaken about code you're not familiar with. Spreading task assignment out to avoid one person being the only contributor to certain parts of the code base gives teammates the context they need to properly review someone else's code.

## #4 Not knowing what to block on

Part of the code review process is preventing poor changes from being made. It acts as a quality gate. The only way PRs can have this function is if merging is prevented when the quality bar is not met. I find that engineers sometimes don't adhere to quality standards as much as they should normally touting something like "we'll fix it later when we have time". One quote from John Wooden comes to mind when I see this.

> If you don't have time to do it right, when will you have time to do it again?

If you see a problem, politely ask for a change, else you'll be reinforcing the bad habits that led to the poor change being made to begin with! Unmaintainable messes aren't made overnight, but commit by commit.

If you are seeing this problem there are a few things to do.

1. **Ensure psychological safety:** Psychological safety, or safety in expressing ideas, concerns, or opinions, must be present not just for engineers to be confident in asking for changes but for a whole host of other reasons that I won't get into in this post.
2. **Ensure a definition of done:** There must be an agreed upon standard for what should be considered "complete" or "sufficient" to be merged backed by leadership. This allows for objectivity in PR reviews. Not having this allows for change requests to be countered with "well, that's just your opinion; I think this is fine". It also allows for laziness and good hopes to push PRs through. [You'll be sorry if this happens](https://blog.rust-lang.org/inside-rust/2023/07/21/crates-io-postmortem.html).
3. **Set the example:** Engineering seniors should set the example by showing it is ok and encouraged to ask for changes. They're the people looked to as models especially when it comes to interpreting the grayer parts of knowing what should be considered "done".

## #3 Not knowing what _not_ to block on

Any engineer, in most places, has power to stop a PR from being merged. This power can be abused, however. Forcing authors to fix things that aren't very important leads to frustration, eroded trust, and unnecessarily slower velocity.

Sometimes this comes from someone being overly dogmatic about their personal coding philosophies. We all know someone who is convinced that Haskell solves every problem. In those cases a manager might need to be involved to calm the person down, but aside from those obvious cases, here are some things to consider.

1. **Ensure a definition of done:** As mentioned before, objectivity allows the standard to be clearly seen by all parties. It gives the author leverage to push back.
2. **Automate as much as possible:** The classic example is automating formatting as to prevent needless bickering, but this can apply to anything that a computer can analyze. The old adage rings, "Gofmt's style is no one's favorite, yet gofmt is everyone's favorite." _- Go Proberbs_. Also, automating is easiest to do if there is a definition of done.
3. **Be ok with good:** We all know the worn out phrase, "The perfect is the enemy of the good", but this is absolutely true with software. It is ok to iterate and the incremental gain of "perfect code" often [doesn't outweigh the value of shipping what you have now](https://ryanclements.dev/posts/amazon-ships-bad-code-too). Just be sure you're not making the system worse and whatever you introduce is easily changeable down the road.
4. **Set the example:** Again, seniors play a big role here helping the team come to a reasonable balance when interpreting the definition of done. The best engineers I've worked with, for the things that can't be automated, err on the side of quality unless deadlines justify merging in what we have now. I also see them prioritize fixing the problems of PR quality at their source instead of counting on good will.

## #2 Poor, unactionable feedback

I find this one to be frustrating. Most engineers are eager to apply feedback, but they can't do that unless they know what they need to do. Vague and/or overly brief comments aren't helpful. It is the reviewer's responsibility to give everything the author needs to make the change and understand why it needs to be made. For more inexperienced engineers, this might mean pointing them to a stack overflow post or writing out pseudocode. This might seem like more work, but this pays off in the long run from avoiding the ping pong game of clarification.

Here are some things I've seen work.

1. **Set expectations for reviewers:** Reviewers should understand their responsibility for their half of the review. I don't think the same level of objectivity as a definition of done is required, rather gentle correction by managers or seniors. I find that engineers want to do good here and this is sufficient.
2. **Ask for clarification:** It is easy to forget what isn't clear to the author from the perspective of the reviewer. Sometimes this comes as a consequence of the [curse of knowledge](https://en.wikipedia.org/wiki/Curse_of_knowledge). If you see this from a reviewer on your PR, kindly asking for clarification works well, just be sure to be specific about what you're confused about so you don't fall into the same trap 😄.
3. **Err on the side of clarity:** I prefer to include more details in review comments than is always necessary. This helps ensure I have a good understanding of what I'm asking for while also making it as easy as possible for the author to implement the changes. A hidden effect of this is that it makes PR archeology easy. We all need to go to some old PR in search of some answer. Leaving good comments makes it easy to remember the context of your past. As a small tip, leaving direct links to code, tickets, etc is super helpful here!

## #1 Taking too long to review

By far this is the most common problem I see and arguably the most dangerous. All of that time waiting for a review is waste. PRs can't be merged if they don't get reviewed! The best solutions to this problem, from what I've seen are simpler than you'd think.

1. **Review open PRs as part of standup:** In my current team, PR review times used to be dismally slow. All we did was show the list of open PRs at the end of each standup, yet simply making the problem regularly visible was enough to put people's butts in gear.
2. **Track average PR age over time:** Seeing a graph of average age every retro or standup, similar to the last point, makes problems visible. This is a key component of taming this problem, but sometimes this is enough.
3. **Automate, automate, automate:** Some PR reviews can be totally automated. If risk of defects can be statically analyzable as low, then it makes sense to just trust the engineer. Sending notifications to engineers on PR readiness also helps. My current team saw value in setting up both a daily slack message of all open PRs and a slack message every time a PR is opened.
4. **Set expectations:** Even after the aforementioned solutions, my team fell back into "someone else will review it" mode. Having a senior leader slap us in the back of the head with "PR reviews are part of performance reviews" was enough to get the team back on track. This method was more heavy handed than the previous ones, but it was effective.
5. **Only open a PR when ready to review:** Don't train your team to ignore PR open notifications by opening PRs that aren't ready to be reviewed. A PR open notification should be a signal that work has entered someone else's queue not noise to set an email filter for. This also requires there to be a "definition of ready" similar to a "definition of done". Work in progress (WIP) PRs are an exception since they are useful for prototyping and getting early feedback, but this should be rare.

## Conclusion

I find that most PR problems are caused by issues occurring sometime before the PR is opened, but reviewer-side problems are common too. Most of the reviewer-side problems stem from ambiguity, lack of discipline, or culture, yet are totally conquerable, sometimes trivially.

In the sprit of shipping fast, let's go look at our PR queue and leave some good feedback 📝.
