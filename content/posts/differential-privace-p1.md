---
title: "On the Impossibility of Learning Fairly in Private"
date: 2026-03-29T20:40:12+02:00
draft: false
summary: ""
---

Every distributed system faces a fundamental coordintation problem: how do you
produce collective intelligence from local knowledge without destroying the
locality that makes the knowledge valuable?

It's the same problem markets solve with prices, organisms solve with nervous
systems and countries solve with constitutions. The answer also seems to be
always structurally the same: you need a communication protocol that
compresses local state into messages, and the compression itself must be lossy
in the right way - preserving what is useful for coordination while discarding
what's private.

Industrial systems seem to have arrived at this problem through their natural
path, with machines distributed across sites, each generating a continuous
stream of observations about their physical world. These observations are
local - they describe a specific motor, pressure vessel, production line.
But the patterns are not. Failure modes recur across installations. Process
dynamics follow shared physics. The whole point of connecting these sites to a
platform is to exploit the non-locality of structure: what happens at one
site tells you something about what might happen at another.

One would think (perhaps naively) to collect everything centrally and learn
from the aggregate. This is what most industrial platforms do - and it works,
until it doesn't. With multiple customers, the data encodes competitive
information. Cycle times are trade secrets. Failure rates are liabilities.
Process recipes are intellectual property. Data in context is knowledge,
and knowledge in the wrong hands is leverage.

This lays a strong foundation for the need for privacy - not as a feature or a
compliance checkbox, but as a structural property of communication protocol
between sites and platform. Differential privacy states it quite precisely:
the message a site sends to the central server should be approximately
invariant to any single observation in the site's dataset. "Approximately" is
controlled by a parameter, which is the price you pay in statistical
resolution for the guarantee you get in information containment. This is not
optional. It's a consequence of the trust topology. You are asking competing
entities to contribute to a shared model. The protocol must ensure the can do
so without self-harm.

So - privacy solves the trust problem, swiftly creating a fairness problem. Or
rather, it amplifies a latent fairness problem already present in the
heterogeneity of the fleet. What does that mean? No two sites are created
equal. Some have modern instrumentation, stable processes and abundant data.
Learning from them is easy. Others have legacy equipment, noisy sensors sparse
observations, which makes it really hard to learn from them. Therefore, a
model that minimises total error across the fleet will, mathematically,
allocate its representational capacity towards the sites where accuracy is
cheap. This is by no means a bug, rather a literal definition of optimisation
unter a global loss function. "Harder" sites get systematically worse
predictions, not because the model is malicious but because it is rational -
it simply makes sense.

In the human domain, we call this discrimination and have spent decades
building legal and ethical frameworks to prevent it. In the industrial domain
we don't have that language yet, but the structure is identical. A customer
paying for a platform and receiving measurably worse service because their
facility is older or smaller or in a different vertical is experiencing the
output of an unfair model. The fact that the sensitive attribute is "equipment
age" rather than "race" changes the moral weight but not the mathematical
structure.

Formally, fairness is a constraint on optimisation: the gap in prediction
quality across defined groups must be bounded. This costs us something - a
fair classifier is not an accurate one. nthe decision boundary shifts away
from the loss-minimising position to equalise performance across groups. That
shift is the fairness tax, paid in aggregate accuracy.

<!-- TODO: Continue from here -->
Privacy and fairness are not independent costs that add linearly. They
interplay. Both need to be estimated from data. Under differential privacy,
the data is noisy. Estimating the correctoin from noisy data is harder than
estimating it from clean data, and the additional...


We are going to dive deeper into the concept of differential privacy through a
series of pieces, with each of them decomposing their respective layers with
increasing depth.

Formally: we will develop the mathematics: the data model, the privacy
mechanism, the fairness constraint, and the four-term risk decomposition.

Implementationally: we will mab the maths into a real architecture. Where does
the Gaussian mechanism sit in a message bus pipeline? Whad does privaciy
composition look like when the same data feeds multiple models? We will close
the gap between the algorithms and a system you can actually deploy.

Empirically: we will develop a measurement framework. How do you estimate
which of the cost terms dominates for a given fleet configuration? What
metrics do you instrument to detect fairness degradation across site classes?
The goal is to make the abstract decomposition observable, so that the
architectural decisions made in the implementation layer can be evaluated and
revised against evidence.
