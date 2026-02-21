import { FaCode, FaUsers, FaRocket, FaHeart } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">AIDEVIX haqida</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-100">
            Biz O'zbekistonda professional dasturlash ta'limini yangi bosqichga olib chiqamiz
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Bizning missiyamiz</h2>
          <p className="text-lg text-gray-300 text-center mb-8">
            AIDEVIX - bu har bir o'zbek yoshiga zamonaviy dasturlash texnologiyalarini o'rgatish va 
            ularni xalqaro bozorda raqobatbardosh mutaxassis qilish uchun yaratilgan platforma.
          </p>
          <p className="text-lg text-gray-300 text-center">
            Biz faqat nazariy bilim emas, balki real loyihalar ustida ishlash tajribasini beramiz.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Bizning qadriyatlarimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCode className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Sifat</h3>
              <p className="text-gray-400">Eng yuqori sifatli ta'lim materiallari</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Jamoa</h3>
              <p className="text-gray-400">Kuchli o'quvchilar jamoasi</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRocket className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Innovatsiya</h3>
              <p className="text-gray-400">Eng yangi texnologiyalar</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Qo'llab-quvvatlash</h3>
              <p className="text-gray-400">Har bir o'quvchiga g'amxo'rlik</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="card p-8">
            <div className="text-5xl font-bold text-primary mb-2">1000+</div>
            <p className="text-gray-400">Faol o'quvchilar</p>
          </div>
          <div className="card p-8">
            <div className="text-5xl font-bold text-secondary mb-2">50+</div>
            <p className="text-gray-400">Video kurslar</p>
          </div>
          <div className="card p-8">
            <div className="text-5xl font-bold text-primary mb-2">500+</div>
            <p className="text-gray-400">Video darslar</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Bizning jamoa</h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
            AIDEVIX jamoasi - bu tajribali dasturchilar, o'qituvchilar va texnologiya ishqibozlari. 
            Biz har bir o'quvchining muvaffaqiyati uchun ishlaymiz.
          </p>
          <div className="text-center">
            <p className="text-xl text-primary font-semibold">
              Tez orada jamoa a'zolari bilan tanishing!
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold mb-6">Bizga qo'shiling!</h2>
        <p className="text-xl text-gray-300 mb-8">
          Professional dasturchi bo'lish yo'lingizni bugun boshlang
        </p>
        <div className="flex justify-center space-x-4">
          <a href="/register" className="btn-primary text-lg">
            Ro'yxatdan o'tish
          </a>
          <a href="/courses" className="btn-secondary text-lg">
            Kurslarni ko'rish
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
