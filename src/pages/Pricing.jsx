import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCheck, FaTimes, FaStar, FaCrown } from 'react-icons/fa';
import PaymentModal from '../components/PaymentModal';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

const Pricing = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [paymentModal, setPaymentModal] = useState({ isOpen: false, plan: null });
  const { toasts, showToast, removeToast } = useToast();

  const plans = [
    {
      id: 'free',
      name: 'FREE',
      price: { monthly: 0, yearly: 0 },
      color: 'from-green-500 to-green-600',
      icon: <FaStar className="text-4xl" />,
      features: [
        { text: 'Faqat bepul videolar', included: true },
        { text: 'Asosiy darslar', included: true },
        { text: 'Cheklangan kontent', included: true },
        { text: 'Ortacha videolar', included: false },
        { text: 'Premium videolar', included: false },
        { text: 'Sertifikat', included: false },
        { text: 'Jonli darslar', included: false },
      ]
    },
    {
      id: 'plus',
      name: 'PLUS',
      price: { monthly: 49000, yearly: 490000 },
      color: 'from-blue-500 to-blue-600',
      icon: <FaStar className="text-4xl" />,
      popular: true,
      features: [
        { text: 'Barcha bepul videolar', included: true },
        { text: 'Ortacha darajadagi videolar', included: true },
        { text: 'Amaliy loyihalar', included: true },
        { text: 'Kod namunalari', included: true },
        { text: 'Premium videolar', included: false },
        { text: 'Sertifikat', included: false },
        { text: 'Jonli darslar', included: false },
      ]
    },
    {
      id: 'pro',
      name: 'PRO',
      price: { monthly: 99000, yearly: 990000 },
      color: 'from-purple-500 to-purple-600',
      icon: <FaCrown className="text-4xl" />,
      features: [
        { text: 'Barcha videolar (FREE + PLUS + PRO)', included: true },
        { text: 'Premium kontent', included: true },
        { text: 'Advanced loyihalar', included: true },
        { text: 'Sertifikat', included: true },
        { text: 'Jonli darslar', included: true },
        { text: 'Mentor support', included: true },
        { text: 'Birinchi yangiliklar', included: true },
      ]
    }
  ];

  const handleSubscribe = (planId) => {
    if (!isAuthenticated) {
      showToast('Iltimos, avval ro\'yxatdan o\'ting!', 'warning');
      setTimeout(() => navigate('/register'), 1500);
      return;
    }

    if (planId === 'free') {
      showToast('Siz allaqachon FREE rejada siz!', 'info');
      return;
    }

    setPaymentModal({ isOpen: true, plan: planId });
  };

  const handlePaymentSuccess = () => {
    showToast('To\'lov muvaffaqiyatli amalga oshirildi! 🎉', 'success', 4000);
    setTimeout(() => {
      navigate('/courses');
    }, 2000);
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Tariflar
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            O'zingizga mos tarifni tanlang va professional dasturchi bo'ling
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-800 rounded-xl p-1 shadow-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Oylik
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yillik 
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                -17% CHEGIRMA
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative animate-slide-in-up ${
                plan.popular ? 'md:scale-110 z-10' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    ⭐ ENG MASHHUR
                  </span>
                </div>
              )}

              <div className={`card ${plan.popular ? 'ring-4 ring-primary' : ''} overflow-hidden`}>
                {/* Header */}
                <div className={`bg-gradient-to-r ${plan.color} p-8 text-center relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                    {plan.icon}
                  </div>
                  <div className="relative z-10">
                    <div className="mb-4">{plan.icon}</div>
                    <h3 className="text-3xl font-bold mb-4">{plan.name}</h3>
                    <div className="text-5xl font-bold mb-2">
                      {plan.price[billingCycle].toLocaleString()}
                      <span className="text-xl ml-2">so'm</span>
                    </div>
                    <p className="text-sm opacity-90">
                      {billingCycle === 'monthly' ? '/ oyiga' : '/ yiliga'}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                          feature.included ? 'bg-green-500/20' : 'bg-gray-700'
                        }`}>
                          {feature.included ? (
                            <FaCheck className="text-green-400 text-xs" />
                          ) : (
                            <FaTimes className="text-gray-500 text-xs" />
                          )}
                        </div>
                        <span className={`ml-3 ${feature.included ? 'text-white' : 'text-gray-500'}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
                      plan.id === 'free'
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : plan.popular
                        ? 'bg-gradient-to-r from-primary to-blue-600 hover:shadow-2xl'
                        : 'bg-gradient-to-r from-secondary to-purple-600 hover:shadow-2xl'
                    }`}
                  >
                    {plan.id === 'free' ? 'Hozirgi rejangiz' : 'Tanlash'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Tez-tez so'raladigan savollar</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Obunani bekor qilsam nima bo\'ladi?',
                a: 'Obunangiz tugaguncha barcha funksiyalardan foydalanishingiz mumkin. Keyin FREE rejaga o\'tasiz.'
              },
              {
                q: 'To\'lov usullari qanday?',
                a: 'UzCard, Humo, Visa va MasterCard kartalar orqali to\'lash mumkin.'
              },
              {
                q: 'Sertifikat qachon beriladi?',
                a: 'PRO rejada kursni 100% tugatganingizdan keyin sertifikat olasiz.'
              },
              {
                q: 'Pul qaytarilishi mumkinmi?',
                a: 'Ha, 7 kun ichida to\'liq pul qaytariladi, agar xizmatdan foydalanmagan bo\'lsangiz.'
              }
            ].map((faq, index) => (
              <div key={index} className="card p-6 hover:shadow-2xl transition-all">
                <h3 className="font-bold text-lg mb-2 text-primary">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ isOpen: false, plan: null })}
        plan={paymentModal.plan}
        billingCycle={billingCycle}
        onSuccess={handlePaymentSuccess}
      />

      {/* Toasts */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default Pricing;
