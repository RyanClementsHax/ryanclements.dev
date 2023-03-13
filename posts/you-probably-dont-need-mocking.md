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

  public async signup(emailAddress: string): Promise<boolean> {
    const isSuccessful = await this.emailService.send(emailAddress, {
      message: 'Thanks for signing up!'
    })
    return isSuccessful
  }
}

class EmailService {
  public async send(
    emailAddress: string,
    options: { message: string }
  ): Promise<boolean> {
    /* ... */
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

This example is a little silly, but the core point here is that mocking lends itself to solidifying implementations not actually checking for behavior changes. The value of testing comes from verifying some behavior still exists. If you have to change your tests every time you make simple changes to your code, not only do you have to spend more time writing the test changes, but it's probable that your test isn't verifying the same behavior. Otherwise, why did you need to change it?.

When unchecked, this can compound into a maintainability nightmare. I've been on projects where you mocked _everything_ that wasn't written in the class you were testing, even objects that just hold data!

## What Am I Supposed To Do?

You might be saying in your head, "Well, Ryan, this sounds nice, but do you seriously want me to actually send an email every time I run my test suite? What if the unit I'm testing makes payments? You can't seriously expect me to not mock that?"

Bear with me, but it depends on what you're testing and the nature of your application.

What I'd also like to suggest is for us to consider what makes a test valuable. A test's value is the reliability to which it fails if a behavior depended upon in production is no longer present in the exercised system, code base, unit, etc. This has a couple of implications.

1. **There is no perfect substitute for production**. All test environments are in some fashion, dummbed down versions of what _actually_ happens in production; therefore, any attempt to run your code in a test environment will necessarily lose fidelity.
2. **Simulate production as much as possible**. Since there is no substitute, make your tests as close to production as possible. This means use real code, with real data, under real conditions where possible (more on this later).
3. **Tests are more valuable when they don't have to be changed**. If you change your tests every time you change your code, how do you know for sure your tests verify the same behavior?

As a consequence, I propose that mocking should be _last_ thing that we reach for, not the _first_. We should see it as one tool in our toolbelt among many in a widely diverse workshop of techniques.

## The Test Totem Pole

What I present below is what I call the "Test Totem Pole". It is a condensed hierarchy of handy test practices that work for most projects. Whenever deciding on a testing strategy for a project or feature, start with the top item, then _justify_ your way down.

As mentioned before there are real reasons to want to stub out behavior which is why I include it in the list. You definitely don't want to make payments every time you run your test suite, and testing _before_ going to production does give us at least some sense that what we wrote won't explode once we get there. What you'll notice, is that mocking is _far_ from being the first item. This is by design.

<aside class="warning">

This is NOT a comprehensive guide to all of the testing techniques out there. This is an _abreviated_ set of practices that I carry in my toolbelt that I find work well for _most_ projects. I'm also continuously learning so feel free to reach out with corrections you like to add 🤗.

</aside>

Without further ado, here is the Testing Totem Pole.

1. E2E Production testing
2. E2E Preproduction testing
3. Local integration testing
4. Unit testing with fakes
5. Unit testing with mocks

Here are the justifications to move to a lower rung. These are in no particular order.

- Nondeterminism
- Side effects
- Performance
- Cost
- Safety
- Developer ergonomics

Now that I've listed all of these out, let's study each point 🤔!

## E2E Production Testing

At first this might scare you, but I've found under consideration that this is sorely overlooked. Again, **there is no perfect substitute for production**. You can write all the unit tests you like, but nothing exercises your code like real users, with real data, solving real problems, under real conditions. At Amazon, we frequently test in production for this reason.

To perform an E2E production test, you should exercise your service exactly as you depend upon it to behave. If it is a backend service for a website form submission, make a real form submission and verify that it has the intended consequence. If it is a CLI that scaffolds a project, scaffold the project and verify it is set up as you expect. If it is a game engine, write a game with it and play the game on a real device. In our login/email example above, we would sign up with a new account and verify that an email was received. E2E testing used to be difficult and flakey, but there has been a new wave of tools like [Cypress](https://www.cypress.io/) that make this easy and even fun!

These tests will exercise the _entire_ technology stack. Everything from the front end, to the api, to database persistence, to release configurations, etc are all tested. Even hard to test layers like networking configuration are implicitly verified by testing end to end.

One key property of this type of testing is that it is easy to change implementation without having to change the tests. You can even change the language you implemented your project in!

These tests sitting at such a high level of detail make them more aligned with how stakeholders desire the system to behave. That being said, the coarse grained view has drawbacks.

Many projects are large and important. Testing in production is too dangerous. Additionally, it can be difficult to pinpoint the source of errors. If an email fails to send is it because you misconfigured some ports, your code has a bug in it, or your third party email service is experiencing an outage? It is also difficult to verify fine grained details like a certain API endpoint was called. This isn't even to mention the problems of gathering all the data you need to make the assertions you want to make. What if you wanted to verify data was stored properly? Are you going to expose your database over the public internet? What if you were asserting against a long running job? This is only a hint of the problems this class of testing poses.

This isn't to say all hope is lost, however. There are techniques and tools at our disposal to mitigate these problems. For example, if you have the infrastructure, you alleviate some danger of deploying with canaries and proper monitoring. Additionally, if you're making a products service and want to E2E test that a POST to `/products/:id` creates some product, instead of attempting to gain access to the database to verify the product was persisted, you could verify the same thing by getting the product from the API (e.g. GET to `/products/:id`).

In short, despite its drawbacks, this form of testing is still the first to consider for me due to how valuable they are and many of the drawbacks for some projects have mitigating techniques available.

Pros

- Has the greatest value over any other technique
- Isn't brittle to implementation changes
- Tests the entirety of the tech stack, even hard to test layers

Cons

- You have to deploy to run these types of tests
- Difficult to make fine grained assertions
- It can be hard to pinpoint the source of an error
- Suffers from flakey dependencies
- Larger projects require more complicated deployment and monitoring strategies
- Can easily take very long to run
- Not all the information might be available to verify correct functionality

## E2E Preproduction Testing

Production, as useful as it is to know how code will actually perform, produces a ton of noise that's difficult to cut through when testing. When testing a piece of software, you don't want components you don't own to interfere with the test results. If that piece is a login service, you don't want an outage in your monitoring stack to prevent testing a login flow. If that piece is a shader for a rendering engine, you don't want a hardware bug to prevent testing lighting algorithms. These issues point to a more stable environment to test in. Enter preprod.

Many teams create a preproduction (preprod) environment alongside their production environment. The goal of preprod is to match as closely as possible to production, but with some simplifications. These environments, if they differ, tend to not receive much load. Developers also tend to have access to resources within preprod like databases and secrets. Although preprod, being a close mirror of production, can suffer from the same problems as production, these simplifications stabilize the environment making it easier to test at the expense of lowered fidelity.

Some projects might not even suffer from lowered fidelity at all! This website, for example, uses [Vercel](https://vercel.com) for hosting. Vercel as a feature called [preview deployments](https://vercel.com/docs/concepts/deployments/preview-deployments) which let you deploy a live version of your site during pull request. It is built and deployed just like production. I use this to visually test my website before deploying, both manually, like to make sure the newest post I wrote looks ok, and automatically, like with lighthouse analysis.

As mentioned, preprod can give you an insight into production behavior _before_ deploying into production. The biggest problem my static webstie would ever have is grammar issues, but software supporting traffic lights has much more to risk. Production testing might be practically, or even morally, impossible for a project which makes preprod testing a good next technique to consider.

It is not without its problems though. Services you don't own, like third party services, might not expose any resources for testing complicating your ability to perform such tests. This also requires creating and maintaining a completely separate environment. Not all projects might be able to afford this. Preprod environments might not even make sense for some projects. Alas, if your project can allow it, consider a preproduction environment as a helpful analog.

Pros

- High production fidelity
- Easier access to resrouces (e.g. databases)
- Tests the entirety of the stack
- Less noise than production

Cons

- You have to deploy to run these types of tests
- Difficult to make fine grained assertions
- It can be hard to pinpoint the source of an error
- Requires a completely separate environment
- Not all third parties allow for test accounts
- Larger projects require more complicated deployment and monitoring strategies
- Can easily take very long to run

## Local Integration Testing

Deploying changes to test them is annoying. This is why the next level I go to is local integration testing. This is the practice where you stand as much of your environment up on your machine as you can and run your tests against that. Dependencies typically are replaced with mocks as access to them locally is sometimes difficult. Tools like [docker compose](https://docs.docker.com/compose/) and [Mock Server](https://www.mock-server.com/#what-is-mockserver) can be very helpful here.

Because all of the resources are local, it is much easier to debug issues. It's also easier to massage the environment into the state you need it in. If these tests are built properly, they can also run in CI.

The biggest thing to keep in mind is that you don't ship your laptop. Production is often on different hardware under different network connectivity with different load and different data. Expecting these tests to provide indication on how a website might perform, for example, will leave you sadly disappointed as you realize much of the world does not have the newest, fastest smart phone. Your laptop is often not subject to security rules like network firewalls or IAM permissions. Expecting this to be a faithful analog to production would be misleading.

Pros

- Don't have to deploy to run tests
- Easier to debug
- Medium fidelity
- Cuts out much noise
- Tests a good portion of your stack
- Can run these tests in CI
- Most projects can do a form of this

Cons

- Doesn't test under real networking/security/hardware conditions
- Doesn't test with real data (sometimes)
- Might be difficult to set up a local environment
- Might be difficult to mock out other services

## In Process Integration Testing with Fakes

All of the techniques before have been out of process solutions. This is the first in process solution, we'll discuss. This technique unit tests

## Unit Testing with Mocks

## Heuristics

## Conclusion
