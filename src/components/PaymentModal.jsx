import { useState } from 'react';
import { FaCreditCard, FaLock } from 'react-icons/fa';
import { SiVisa, SiMastercard } from 'react-icons/si';

const PaymentModal = ({ isOpen, onClose, plan, billingCycle, onSuccess }) => {
  const [cardType, setCardType] = useState('uzcard');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const prices = {
    plus: { monthly: 49000, yearly: 490000 },
    pro: { monthly: 99000, yearly: 990000 }
  };

  const amount = prices[plan]?.[billingCycle] || 0;

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setFormData({ ...formData, cardNumber: value });
    }
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setFormData({ ...formData, expiryDate: value });
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value;
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setFormData({ ...formData, cvv: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl my-8 animate-scale-in border border-gray-700">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">To'lov ma'lumotlari</h2>
          <p className="text-sm md:text-base text-gray-400">
            {plan.toUpperCase()} - {billingCycle === 'monthly' ? 'Oylik' : 'Yillik'} obuna
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Amount */}
          <div className="bg-gradient-to-r from-primary to-secondary p-4 md:p-6 rounded-xl mb-4 md:mb-6 text-center">
            <p className="text-xs md:text-sm text-gray-200 mb-2">To'lov summasi</p>
            <p className="text-3xl md:text-4xl font-bold">{amount.toLocaleString()} so'm</p>
          </div>

          {/* Card Type Selection */}
          <div className="mb-4 md:mb-6">
            <label className="block text-sm font-semibold mb-3">Karta turini tanlang</label>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              <button
                type="button"
                onClick={() => setCardType('uzcard')}
                className={`p-3 md:p-4 rounded-xl border-2 transition ${
                  cardType === 'uzcard'
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="text-center">
                  <FaCreditCard className="text-2xl md:text-3xl mx-auto mb-2 text-blue-400" />
                  <p className="font-semibold text-xs md:text-sm">UzCard</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setCardType('humo')}
                className={`p-3 md:p-4 rounded-xl border-2 transition ${
                  cardType === 'humo'
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="text-center">
                  <FaCreditCard className="text-2xl md:text-3xl mx-auto mb-2 text-green-400" />
                  <p className="font-semibold text-xs md:text-sm">Humo</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setCardType('visa')}
                className={`p-3 md:p-4 rounded-xl border-2 transition ${
                  cardType === 'visa'
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="text-center">
                  <SiVisa className="text-2xl md:text-3xl mx-auto mb-2 text-blue-600" />
                  <p className="font-semibold text-xs md:text-sm">Visa</p>
                </div>
              </button>
            </div>
          </div>

          {/* Card Number */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Karta raqami</label>
            <div className="relative">
              <input
                type="text"
                value={formatCardNumber(formData.cardNumber)}
                onChange={handleCardNumberChange}
                placeholder="0000 0000 0000 0000"
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base md:text-lg tracking-wider"
                required
              />
              <FaCreditCard className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            </div>
          </div>

          {/* Card Holder */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Karta egasi</label>
            <input
              type="text"
              value={formData.cardHolder}
              onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value.toUpperCase() })}
              placeholder="ISM FAMILIYA"
              className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary uppercase"
              required
            />
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-4 mb-4 md:mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Amal qilish muddati</label>
              <input
                type="text"
                value={formatExpiryDate(formData.expiryDate)}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base md:text-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">CVV</label>
              <input
                type="password"
                value={formData.cvv}
                onChange={handleCvvChange}
                placeholder="***"
                maxLength="3"
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base md:text-lg text-center"
                required
              />
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-gray-700/50 p-3 md:p-4 rounded-lg mb-4 md:mb-6 flex items-start space-x-3">
            <FaLock className="text-green-400 mt-1 flex-shrink-0" />
            <p className="text-xs md:text-sm text-gray-300">
              Barcha to'lovlar xavfsiz SSL shifrlash orqali amalga oshiriladi. 
              Karta ma'lumotlaringiz saqlanmaydi.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 sticky bottom-0 bg-gradient-to-t from-gray-800 to-transparent pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 md:px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition text-sm md:text-base"
              disabled={isProcessing}
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="flex-1 px-4 md:px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold transition disabled:opacity-50 text-sm md:text-base"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Kutilmoqda...
                </span>
              ) : (
                `${amount.toLocaleString()} so'm to'lash`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
