# How to contribute

It is essential to the development of tiles2D.js. Here are some guidelines to make
that process silky smooth for all involved.

## Reporting issues

To report a bug, request a feature, or even ask a question, make use of the GitHub Issues
section for [tiles2D.js][issues]. When submitting an issue please take the following steps:

1. **Search for existing issues.** Your question or bug may have already been answered or fixed,
be sure to search the issues first before putting in a duplicate issue.

2. **Create an isolated and reproducible test case.** If you are reporting a bug, make sure you
also have a minimal, runnable, code example that reproduces the problem you have.

3. **Share as much information as possible.** Include browser version affected, your OS, version of
the library, steps to reproduce, etc. "XX isn't working!!!!" will probably just be closed.

## Contributing Changes

### Setting Up

To setup for making changes you will need to take a few steps, we've outlined them below:

1. Ensure you have node.js installed. You can download node.js from [nodejs.org][node]. Because
tiles2D uses modern JS features, you will need a modern version of node. v6+ is recommended.

2. Fork the [tostegroo][tiles2D] repository.

3. Next, run `npm install` from within your clone of your fork. That will install dependencies
necessary to build tiles2D.js


### Making a Change

Once you have node.js, the repository, and have installed dependencies are you almost ready to make your
change. The only other thing before you start is to checkout the correct branch. Which branch you should
make your change to (and send a PR to) depends on the type of change you are making.

Here is our branch breakdown:

- `master` - Make your change to the `master` branch if it is an *urgent* hotfix.
- `dev` - Make your change to `dev` if it is a *non-urgent* bugfix or a backwards-compatible feature.
- `next` - Make your change to `next` if it is a breaking change, or wild/crazy idea.

Your change should be made directly to the branch in your fork, or to a branch in your fork made off of
one of the above branches.

### Submitting Your Change

After you have made and tested your change, commit and push it to your fork. Then, open a Pull Request
from your fork to the main tiles2D.js repository on the branch you used in the `Making a Change` section of this document.

## Quickie Code Style Guide

- Use 4 "spaces" tabs, never space characters.
- No trailing whitespace, blank lines should have no whitespace.
- Always favor strict equals `===` unless you *need* to use type coercion.
- Follow conventions already in the code, please.

## Contributor Code of Conduct

[Code of Conduct](CODE_OF_CONDUCT.md) is adapted from [Contributor Covenant, version 1.4](http://contributor-covenant.org/version/1/4)
