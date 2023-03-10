---
bannerAlt: one way sign by @bdchu614 on Unsplash
description: >-
  Mocking is overused and can lead to brittle tests. Here I go over alternatives and when you should reach for mocking.
title: You Probably Don't Need Mocking
---

When I first joined the software industry working my first internship, one of the first things I learned was what a "unit test" was. Following the explanation for why tests should exercise "units", typically classes, in isolation from each other, came another explanation for what "mocking" was and why it is useful in accomplishing isolation. Like any new engineer, I did what the big kids did and hardly questioned the practice. I even convinced myself that this was "best practice" - a term I'm slowly beginning to realize is more loose than I was initially led to believe. Like any engineering practice, its drawbacks started to show with scale and overreliance.

At scale, unit tests that overrely on mocking become change detection tests - tests that only test the code is implemented the way it is written, not that it behaves in a way that you expect. Here is an example of a test I might have written a few years ago. It is written in JavaScript, but the concepts apply to any language.

```ts
import { when } from 'jest-when'
import { mock } from 'jest-mock-extended'

class LoginService {
  constructor(private emailService: EmailService) {}

  public async signup(emailAddress: string): boolean {
    const isSuccessful = await this.emailService.send(emailAddress, {
      message: 'Thanks for signing up!'
    })
    return isSuccessful
  }
}

test('signup sends email and returns true when email service returns true', async () => {
  const emailAddress = 'test@test.com'
  const emailService = mock<EmailService>()
  when(emailService.send)
    .calledWith(emailAddress, {
      message: 'Thanks for signing up!'
    })
    .mockResolvedValue(true)
  const loginService = new LoginService(emailService)

  const isSuccessful = await loginService.signup(emailAddress)

  expect(isSuccessful).toBe(true)
})
```

This test works fine until you want to make innocent changes to the code. What if you want to change the method signature of `send` to something like this?

```tsx
const isSuccessful = await this.emailService.send({
  emailAddress,
  message: 'Thanks for signing up!'
})
```

## The Problem

What if instead of directly calling the `emailService` what if you needed another layer of abstraction between `LoginService` and `EmailService` that handled more than just emails? What if you used a different email client because you switched email vendors? What if you queued up email messages to be sent later instead of directly calling the service?

This example is a little silly, but the core message here is that mocking lends itself to solidifying implementations not actually checking for behavior changes. The value of testing comes from verifying some behavior still exists and if you have to change your tests every time you make simple changes to your code, you lose some reliability that the test is verifying the same thing. When unchecked, this can compound into a maintainability nightmare. I've been on projects where you mocked _everything_ that wasn't written in the class you were testing, even objects that just hold data!

You might be saying in your head, "Well, Ryan, this sounds nice, but do you seriously want me to actually send an email every time I run my test suite? What if the unit I'm testing makes payments? You can't seriously expect me to not mock that?"

Bear with me, but yes and no.

What I'd also like to suggest is for us to consider what makes a test valuable. A test's value is the reliability to which it fails if a behavior depended upon in production is no longer present in the exercised system, code base, unit, etc. This has a couple of implications.

1. **There is no perfect substitute for production**. All test environments are in some fashion, dummbed down versions of what _actually_ happens in production; therefore, any attempt to run your code in a test environment will necessarily lose fidelity.
2. **Simulate production as much as possible**. Since there is no substitute, make your tests as close to production as possible. This means use real code, with real data, under real conditions where possible (more on this later).
3. **Tests are more valuable when they don't have to be changed**. If you change your tests every time you change your code, how do you know for sure your tests verify the same behavior?

As a consequence, what I'd also like to suggest is making mocking the _last_ thing that we reach for, not the _first_. We should see it as one tool in our toolbelt among many in a widely diverse workshop of techniques.

## What Do I Do Instead?

As mentioned before there are real reasons to want to stub out behavior. You definitely don't want to make payments every time you run your test suite, and testing _before_ going to production does give us at least some sense that what we wrote won't explode once we get there. What I'd like to present is a condensed hierarchy of test practices and paired with reasons to justify reaching for a lower rung.

<aside class="warning">

This is NOT a comprehensive guide to all of the testing techniques out there. This is an _abreviated_ set of tools that I carry in my toolbelt on a regular basis. I'm also continuously learning so feel free to reach out with corrections you like to add 🤗.

</aside>

My team at Amazon is currently holding a weekly book club meeting reading [Unit Testing Principles, Practices, and Patterns](https://www.amazon.com/gp/product/1617296279/ref=ppx_yo_dt_b_asin_title_o01_s00?ie=UTF8&psc=1).

## Nondeterminism

## Side Effects

## Performance

## Cost

## Safety

## Developer ergonomics

## Heuristics

## Conclusion
