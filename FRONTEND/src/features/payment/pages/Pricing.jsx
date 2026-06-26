import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Rocket, Crown, Check, Box, BaselineIcon } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: 0,
    tokens: '1K',
    period: 'forever',
    icon: Zap,
    iconBg: 'bg-slate-800',
    iconColor: 'text-slate-400',
    features: ['Basic API access', 'Community support', '1 project'],
    cta: 'Get started',
    featured: false,
  },
  {
    name: 'Basic',
    price: 199,
    tokens: '10K',
    period: 'per month',
    icon: BaselineIcon,
    iconBg: 'bg-purple-950',
    iconColor: 'text-purple-400',
    features: ['Priority API access', '4 projects', 'Usage analytics'],
    cta: 'Select plan',
    featured: false,
  },
  {
    name: 'Medium',
    price: 399,
    tokens: '50K',
    period: 'per month',
    icon: Rocket,
    iconBg: 'bg-violet-950',
    iconColor: 'text-violet-400',
    features: ['Priority API access', 'Email support', '10 projects', 'Usage analytics'],
    cta: 'Select plan',
    featured: true,
  },
  {
    name: 'Premium',
    price: 699,
    tokens: '100k',
    period: 'per month',
    icon: Crown,
    iconBg: 'bg-emerald-950',
    iconColor: 'text-emerald-400',
    features: ['Full API access', 'Dedicated support', 'Unlimited projects', 'Advanced analytics', 'Custom rate limits'],
    cta: 'Select plan',
    featured: false,
  },
]

const Pricing = () => {
  const [annual, setAnnual] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 gap-10">
      <h1 className="text-3xl font-semibold tracking-tight text-white">Upgrade your plan</h1>
      <div className="grid w-10/12 gap-4 md:grid-cols-4">
        {plans.map((plan) => {
          const Icon = plan.icon
          const price = plan.price

          return (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-5 flex flex-col gap-5 transition-colors
                ${plan.featured
                  ? 'bg-slate-900 border-2 border-violet-600'
                  : plan.name !== "Premium" ? 'bg-slate-900/60 border border-slate-800 hover:border-slate-700' : 'bg-slate-900/60 border border-green-950 hover:border-green-800'
                }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold bg-violet-600 text-white px-3 py-1 rounded-full whitespace-nowrap">
                  Most popular
                </span>
              )}

              <div className="flex items-start justify-between">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${plan.iconBg}`}>
                  <Icon size={18} className={plan.iconColor} />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-300">{plan.name}</p>
                <div className="flex items-end gap-1 mt-1">
                  <span className="text-3xl font-semibold text-white">₹{price}</span>
                  {price > 0 && <span className="text-slate-500 text-sm mb-1.5">/ mo</span>}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{price === 0 ? 'forever' : annual ? 'billed annually' : 'billed monthly'}</p>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-800/60 rounded-lg px-3 py-2 w-fit border border-slate-700/50">
                <Box size={13} className="text-slate-500" />
                <span className="text-xs font-medium text-slate-300">{plan.tokens} tokens / month</span>
              </div>

              <div className="h-px bg-slate-800" />

              <ul className="flex flex-col gap-2.5 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-400">
                    <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center
                      ${plan.featured ? 'bg-violet-950 text-violet-400' : 'bg-slate-800 text-slate-500'}`}>
                      <Check size={10} strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.name !== "Free" && <Link
                to={`/checkout?plan=${plan.name.toLocaleLowerCase()}`}
                className={`mt-auto w-full text-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-150
                  ${plan.featured
                    ? 'bg-violet-600 hover:bg-violet-500 text-white'
                    : plan.name !== "Premium" ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700' : "bg-slate-800 hover:bg-green-500/20 text-slate-200 border border-green-700"
                  }`}
              >
                {plan.cta}
              </Link>}
            </div>
          )
        })}
      </div>

      <p className="text-xs text-slate-600">No credit card required for the free plan.</p>
    </div>
  )
}

export default Pricing