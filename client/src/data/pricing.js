export const pricingPlans = [
  {
    id: 1,
    name: "Starter",
    price: "$19",
    period: "/month",
    description: "For individuals who want simple and powerful analytics.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=85",
    features: [
      "5 dashboards",
      "Basic analytics",
      "Email reports",
      "1 team member"
    ]
  },
  {
    id: 2,
    name: "Professional",
    price: "$49",
    period: "/month",
    description: "For growing teams that need advanced insights.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=85",
    features: [
      "Unlimited dashboards",
      "Advanced analytics",
      "Real-time reports",
      "10 team members",
      "Priority support"
    ],
    popular: true
  },
  {
    id: 3,
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For organizations requiring complete control and scale.",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=85",
    features: [
      "Everything in Professional",
      "Custom analytics",
      "Unlimited members",
      "Dedicated support",
      "Advanced security"
    ]
  }
];
