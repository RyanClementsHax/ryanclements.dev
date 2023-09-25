---
bannerAlt: pen on paper @aaronburden on Unsplash
publishedOn: 2023-09-25T04:00:00.000Z
description: >-
  Here I list the most common antipatterns I see PR authors make and how to fix
  them at their core
title: The 5 Most Common PR Authoring Antipatterns I see
---

I was reading a well thought out [article](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/yes-you-can-measure-software-developer-productivity) on developer productivity. There's much to say about the framework they provide, but I'd like to focus on one of the metrics they find useful - code review timing.

Because pull requests, code reviews, merge requests, whatever you want to call them require handing off work to someone else, queueing delays naturally happen and can have a serious impact on productivity when left unchecked.

Many engineers recognize the opportunity presented and fixate on procuring a review by annoying other engineers out of their flow. Yet I find this to not be a fruitful use of our time. In my experience (yours may differ) from the hundreds, maybe thousands, of PRs I've reviewed, the root cause for slow PRs often is a problem with the changes themselves (e.g. size, bugs, documentation, tests, etc.) which force rework and additional time waiting for re-reviews.

Consequently, let's focus on what we can do to make PRs uneventful by removing the common causes of revisions. Here are the 5 most common problems I've seen and how to address them.

## #5: Improper test coverage

I find many of the PRs I ask for another revision for don't include valuable tests. I don't expect every line to be covered especially since not all lines of code are valuable or cost effective to test; however, I expect enough to provide value. I also expect the tests to not just assert that the code was written the way it was written like [relying too heavily on mocking](https://ryanclements.dev/posts/you-probably-dont-need-mocking); hence why I stress the word **value**.

If engineers aren't writing tests for their PRs, this typically points one of the following.

1. **Lack of culture of quality:** Ensure your team has a culture of a good balance of quality and speed. Valuable tests bloom naturally in that environment. It is also strictly necessary that this exists else you'll just be accused of wasting time.
2. **Lack of skill:** Writing valuable tests is a skill that needs to be fostered. Make sure your team has the right resources to learn. Book clubs, mentorship, and good reference tests go a long way here. If you're looking for a guide, [Unit Testing Principles, and Patterns](https://www.amazon.com/gp/product/1617296279/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1) is an excellent book. I've personally seen test quality improve just from a 30 minute, weekly book club on this book.
3. **Too much friction:** I've seen engineers skip tests simply because automated tests weren't set up. Even if the set up is simple, many will skip this step as "out of scope" or "not my job". In this case, pay the upfront cost to set up testing. This might be a large effort for some projects. In which case work iteratively. After setting up effortless test authoring on a project, I frequently see more tests being written (in part because I took away their excuse 😉).

## #4: Implementations forced by tech debt

This problem is a tricky one. Sometimes the right way™️ to do something isn't an option. Do you ask for another revision (or even another PR) to pay down the tech debt first or do you accept adding to the tech debt 🤷🏼‍♂️? I bias towards the former, but this is highly dependent on project constraints. Sometimes the latter is absolutely the right decision. Regardless, this needs to be kept in check as legacy projects from hell aren't created overnight; they're made over years of neglect one commit at a time.

Borrowing from finance, to best manage debt, you should 1. track it and 2. regularly make payments. Tracking reinforces for both the development team AND stakeholders that quick and dirty isn't free and provides data for justifying when to pay down debt. Regular payments further help ingraining habit into all parties. I've personally found this to work really well as most stakeholders are frustrated with lack of velocity from engineering.

## #3: Not accounting for all edge cases

It is easy for engineers to only think of happy paths or forget all of the states their program will execute in. My favorite description of this phenomenon comes from [Jimmy Bogard's 6 Little Lines of Fail](https://www.youtube.com/watch?v=VvUdvte1V3s) when he describes ways even simple code can fail spectacularly. I find this is especially true for concurrent or distributed code.

Investing in the engineering skills and domain knowledge of your team or yourself goes a long way here, but there a few techniques overlooked that are arguably the most helpful.

1. **Create fast feedback loops:** Bugs happen. We can't expect ourselves to catch every single one before shipping. To do so would require proofs of correctness with every PR. Instead, make sure learning is quick by making the feedback loop between development and bug discovery as small as possible. Improving the [DORA metrics](https://linearb.io/platform/dora-metrics?landing=true&_bt=646641474362&_bk=dora%20metrics&_bm=e&_bn=g&_bg=145096855425&utm_term=dora%20metrics&utm_medium=cpc&utm_campaign=Dora_Metrics_NA&utm_source=google&gclid=Cj0KCQjwxuCnBhDLARIsAB-cq1rH7sRUmcc4mmfwgiYcNYDOjJ6MBYr_qxQmCE0eoUcMIA5e9capX6saAqXvEALw_wcB) help the most here as well as providing learning resources to engineers.
2. **Relentlessly simplify:** Fix edge cases by removing them. [Expecting people to fit complicated systems in their working memory is futile](https://ryanclements.dev/posts/stop-forcing-us-to-think). Simplicity delivers massive business value.
3. **Listen to real users:** Aggressively prevent yourself or your team from disconnecting from how your software is used by real users. Immerse yourself in the harsh reality of how your business actually functions. If you don't fully understand your problem space or your users, it is unlikely you'll make something of value.

## #2: Not fully understanding consequences

It is ~~exciting~~ addicting to see your code work. It sometimes comes after hours of exhausting effort. As a result, it is tempting to write some tests and push your code as is, but even if the acceptance criteria were all met, you've only provided half of the value of the change. The other half is making the change **continuously provide value in the future**. If your change imposes some on going cost like adding tech debt, making local development difficult, or encourages poor coding practices, the additional value the change is likely to be offset or capsized by its downstream consequences.

One example I find comically common is how bad code multiples due to copy and paste. I find most engineers start their tasks by copying working implementations then tweaking to fit their use case even if it was a hack to begin with. Down the line, the poor code spreads virally until changes become too expensive to make or code becomes too difficult to read. At this point almost every file mocks you for not fixing this earlier.

We as engineers solve this problem by simplifying, documenting, and encouraging learning on our team. The ongoing cost is well worth the investment. If you see these problems in your project, pay the upfront cost ASAP. It is far cheaper than dealing with the long term consequences. Take this from someone who has seen project velocity grind to a screeching halt because no one took initiative to stop the cancer early.

## #1 Not fully understanding the problem

You can't make an effective solution in a problem space you don't understand; therefore, writing code is futile unless you clarify requirements and, preferably, talk directly to users. If you don't, you'll, hopefully, be corrected in code review or, worse, by actual users/stakeholders. Encourage your team to make regular time to sharpen their knowledge of relevant domains, projects, or technologies. Documentation, clear requirements, and workshops all work very well.

Personally, the greatest help I've seen here is allowing engineers the time to explore and learn; however, we MUST reflect this in the workloads we put on engineers, company culture, and reward structures. So many times do I see leadership proclaim their love and support for engineers to understand their users or invest time learning, but don't want to allocate ANY developer bandwidth for it. Why should engineers spend time NOT delivering on the tasks they constantly get pressured to complete? That's what their performance reviews are built on top of. It's what they get pestered about every day. Even someone like myself, who knows the additional time spent feeds back into my ability to deliver, still finds it difficult to prioritize time. There's no psychological safety! It feels like I'm doing something wrong, wasting time, or risking punishment if I'm found out.

## Conclusion

So in conclusion, the causes of problems found in pull requests are often found way earlier in the dev lifecycle, sometimes as far back as the establishing of the company culture. These are just five of the most common problems I see, but there are many more. In the next post I'll talk about the most common problems I see on the reviewer's side. In the meantime, let's go talk to some users and set up a book club 💪🏼.
