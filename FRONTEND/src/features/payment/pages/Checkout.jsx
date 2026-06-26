import { useEffect } from 'react'
import { ShieldCheck, RefreshCw, Clock, CreditCard, Rocket } from 'lucide-react'
import usePayment from '../hook/usePayment'
import { useSearchParams } from "react-router-dom";


const Checkout = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const { handleCheckoutDetail, planDetail, handlePayment } = usePayment()

  useEffect(() => {
    const plan = searchParams.get("plan")
    handleCheckoutDetail(plan)
  }, [searchParams.get("plan")])


  return (planDetail &&
    <div className="h-screen w-full bg-slate-950 flex items-center justify-center p-6 overflow-hidden">
      <div className=" grid grid-cols-[1fr_1.15fr] border border-slate-800 rounded-2xl overflow-hidden">

        {/* LEFT — order summary */}
        <div className="bg-slate-900 border-r border-slate-800 p-7 flex flex-col gap-6">

          <div>
            <span className="inline-flex items-center gap-1.5 bg-violet-950 text-violet-400 border border-violet-800 rounded-lg px-2.5 py-1 text-xs font-medium">
              <Rocket size={13} /> {planDetail.name} plan
            </span>
            <p className="mt-4 text-3xl font-semibold text-slate-100 leading-none">
              ₹{planDetail.price}
            </p>
            <p className="mt-1 text-xs text-slate-500">per month · billed today</p>
          </div>

          <div className="h-px bg-slate-800" />

          <div className="flex flex-col gap-3">
            <InfoRow label={`${planDetail.name} plan`} value={`₹${planDetail.price}`} />
            <div className="h-px bg-slate-800" />
            <div className="flex justify-between text-sm font-medium">
              <span className="text-slate-300">Total due</span>
              <span className="text-slate-100 text-base">₹{planDetail.price}</span>
            </div>
          </div>

          <div className="h-px bg-slate-800" />

          <div className="flex flex-col gap-2.5 mt-auto">
            <TrustItem icon={ShieldCheck} text="256-bit SSL encryption" />
            <TrustItem icon={RefreshCw} text="Cancel anytime, no lock-in" />
            <TrustItem icon={Clock} text="Instant activation after payment" />
          </div>
        </div>

        {/* RIGHT — plan info + pay button */}
        <div className="bg-slate-950 p-7 flex flex-col gap-5">

          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-slate-500 mb-3">
              What you're getting
            </p>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-2.5">
              <InfoRow label="Plan" value={planDetail.name} />
              <InfoRow label="Tokens" value={planDetail.tokens} />
              <InfoRow label="Billing" value="Monthly · auto-renews" />
            </div>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-slate-500 mb-3">
              What happens next
            </p>
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2">
              <Step n={1} text="Razorpay opens a secure payment window — UPI, card, or netbanking." />
              <Step n={2} text="You authenticate and confirm the payment." />
              <Step n={3} text="Your plan activates instantly and you're redirected to the dashboard." />
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-2">
            <button
              onClick={()=>handlePayment(searchParams.get("plan"))}
              className="w-full cursor-pointer flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 text-blue-400 font-medium text-sm py-3 rounded-xl transition-colors duration-150"
            >
              <CreditCard size={16} />
              Pay ₹{planDetail.price}
            </button>
            <p className="text-center text-xs text-slate-600">
              Powered by <span className="text-blue-500">Razorpay</span> · PCI DSS compliant
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}




const InfoRow = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-slate-500">{label}</span>
    <span className="text-slate-300">{value}</span>
  </div>
)

const TrustItem = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2 text-xs text-slate-500">
    <Icon size={13} className="text-slate-600 shrink-0" />
    {text}
  </div>
)

const Step = ({ n, text }) => (
  <div className="flex items-start gap-2.5 py-1.5">
    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 text-[11px] font-medium flex items-center justify-center shrink-0 mt-0.5">
      {n}
    </span>
    <span className="text-xs text-slate-500 leading-relaxed">{text}</span>
  </div>
)

export default Checkout