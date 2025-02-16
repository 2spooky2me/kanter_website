import React from "react";
import { useSelector } from "react-redux";
import HeaderV2 from "../NavBar/HeaderV2";

const AboutUs = () => {
    const currentLanguage = useSelector((state) => state.furniture.currentLanguage || "en");

    const content = {
        en: {
            header: "About Kanter",
            text: `
                Welcome to "Kanter" – the leading furniture factory in Rishon Lezion since 1992. 
                For over 30 years, we at Kanter have specialized in designing and manufacturing 
                luxury living rooms that combine uncompromising quality, comfort, and meticulous design.

                At Kanter, our vision is to create living rooms that are not just furniture but 
                an integral part of your home. Every piece we craft is made with attention to 
                the smallest details, from selecting the highest-quality materials to achieving 
                the perfect finish, ensuring it exudes luxury and comfort for years to come.

                Our factory, located in the heart of Rishon Lezion, proudly offers personalized 
                solutions for every client, emphasizing unique needs and personal style. Our team 
                of designers and craftsmen combines the tradition of fine furniture-making with 
                modern technology to create the perfect living room for you.

                At Kanter, your home transforms into a beautifully designed dream. We would be 
                delighted to host you at our factory and work together to create the living room 
                you’ve always dreamed of.
            `,
        },
        he: {
            header: "אודות קנטר",
            text: `
                ברוכים הבאים ל"קנטר" – מפעל הרהיטים המוביל בראשון לציון מאז 1992. כבר 
                יותר מ-30 שנה, אנו בקנטר מתמחים בעיצוב וייצור סלונים יוקרתיים המשלבים 
                איכות בלתי מתפשרת, נוחות ועיצוב מוקפד.

                החזון שלנו בקנטר הוא ליצור סלונים שהם לא רק רהיטים, אלא חלק בלתי נפרד 
                מהבית שלכם. כל פריט שאנו מייצרים נבנה מתוך מחשבה על פרטים קטנים, החל 
                מבחירת החומרים האיכותיים ביותר ועד לגימור המושלם, כדי להבטיח שהוא ישדר 
                יוקרה ונוחות לאורך שנים.

                המפעל שלנו, הממוקם בלב ראשון לציון, גאה להציע פתרונות בהתאמה אישית לכל 
                לקוח, תוך שימת דגש על צרכים ייחודיים וסגנון אישי. צוות המעצבים 
                והאומנים שלנו משלב מסורת של אומנות רהיטים עם טכנולוגיה מודרנית כדי 
                ליצור את הסלון המושלם עבורכם.

                בקנטר, הבית שלכם הופך לחלום מעוצב. נשמח לארח אתכם במפעל שלנו וליצור יחד 
                את הסלון שתמיד חלמתם עליו.
            `,
        },
        ru: {
            header: "О Кантере",
            text: `
                Добро пожаловать в "Кантер" – ведущую фабрику мебели в Ришон-ле-Ционе с 1992 года. 
                Более 30 лет мы в "Кантер" специализируемся на проектировании и производстве 
                роскошных гостиных, которые сочетают непревзойденное качество, комфорт и тщательный дизайн.

                Наша цель в "Кантер" – создавать гостиные, которые являются не просто мебелью, 
                но и неотъемлемой частью вашего дома. Каждое изделие изготавливается с вниманием 
                к мельчайшим деталям: от выбора высококачественных материалов до идеальной отделки, 
                обеспечивающей роскошь и комфорт на долгие годы.

                Наша фабрика, расположенная в самом сердце Ришон-ле-Циона, с гордостью предлагает 
                индивидуальные решения для каждого клиента, подчеркивая уникальные потребности и 
                персональный стиль. Наша команда дизайнеров и мастеров объединяет традиции 
                высокого мебельного искусства с современными технологиями для создания 
                идеальной гостиной для вас.

                В "Кантер" ваш дом превращается в красиво оформленную мечту. Мы будем рады 
                пригласить вас на нашу фабрику и вместе создать гостиную вашей мечты.
            `,
        },
    };

    const { header, text } = content[currentLanguage];

    return (
        <>
            <HeaderV2 />
            <section className="bg-gray-100 py-16">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
                        {header}
                    </h2>
                    <div className="bg-white shadow-lg rounded-lg p-8 text-gray-700 text-lg leading-relaxed">
                        <p className="whitespace-pre-line">{text}</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutUs;
