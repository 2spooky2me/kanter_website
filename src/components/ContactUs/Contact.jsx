import React, { useState } from "react";
import { useSelector } from "react-redux";
import emailJs from "@emailjs/browser";
import HeaderV2 from "../NavBar/HeaderV2";

const Contact = () => {
    const currentLanguage = useSelector((state) => state.furniture.currentLanguage || "en");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [status, setStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const content = {
        en: {
            header: "Contact Us",
            intro: "We'd love to hear from you! Fill out the form below or reach us at our email or phone number.",
            labels: {
                name: "Full Name",
                email: "Email Address",
                phone: "Phone Number",
                message: "Message",
                send: "Send Message",
            },
            placeholders: {
                name: "Enter your full name",
                email: "Enter your email address",
                phone: "Enter your phone number",
                message: "Write your message here",
            },
            success: "Message sent successfully!",
            error: "Failed to send message. Please try again.",
            wait: "Please wait before sending another message.",
            sending: "Sending...",
            contact: "You can also reach us at:",
            email: "Email",
            phone: "Phone",
        },
        he: {
            header: "צור קשר",
            intro: "נשמח לשמוע ממך! מלא את הטופס למטה או צור קשר באמצעות האימייל או הטלפון שלנו.",
            labels: {
                name: "שם מלא",
                email: "כתובת אימייל",
                phone: "מספר טלפון",
                message: "הודעה",
                send: "שלח הודעה",
            },
            placeholders: {
                name: "הכנס את שמך המלא",
                email: "הכנס את כתובת האימייל שלך",
                phone: "הכנס את מספר הטלפון שלך",
                message: "כתוב כאן את ההודעה שלך",
            },
            success: "ההודעה נשלחה בהצלחה!",
            error: "שליחת ההודעה נכשלה. אנא נסה שוב.",
            wait: "אנא המתן לפני שליחת הודעה נוספת.",
            sending: "שולח...",
            contact: "ניתן גם ליצור איתנו קשר ב:",
            email: "אימייל",
            phone: "טלפון",
        },
        ru: {
            header: "Свяжитесь с нами",
            intro: "Мы будем рады услышать от вас! Заполните форму ниже или свяжитесь с нами по электронной почте или телефону.",
            labels: {
                name: "Полное имя",
                email: "Электронная почта",
                phone: "Номер телефона",
                message: "Сообщение",
                send: "Отправить сообщение",
            },
            placeholders: {
                name: "Введите ваше полное имя",
                email: "Введите ваш адрес электронной почты",
                phone: "Введите ваш номер телефона",
                message: "Напишите ваше сообщение здесь",
            },
            success: "Сообщение успешно отправлено!",
            error: "Не удалось отправить сообщение. Пожалуйста, попробуйте еще раз.",
            wait: "Пожалуйста, подождите перед отправкой нового сообщения.",
            sending: "Отправка...",
            contact: "Вы также можете связаться с нами по:",
            email: "Электронная почта",
            phone: "Телефон",
        },
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSubmitting) {
            setStatus(content[currentLanguage].wait);
            return;
        }

        setIsSubmitting(true);
        setStatus(content[currentLanguage].sending);

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            message: formData.message,
            to_name: currentLanguage === "en" ? "Kanter" : currentLanguage === "he" ? "קנטר" : "Кантер",
        };

        emailJs
            .send(
                "service_a0ije04",
                "template_64gnlra",
                templateParams,
                "YBfqzMmaitT7ufnv_"
            )
            .then(
                () => {
                    setStatus(content[currentLanguage].success);
                    setFormData({ name: "", email: "", phone: "", message: "" });
                    setTimeout(() => setIsSubmitting(false), 30000);
                },
                () => {
                    setStatus(content[currentLanguage].error);
                    setIsSubmitting(false);
                }
            );
    };

    const langContent = content[currentLanguage];

    return (
        <>
            <HeaderV2 />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                        {langContent.header}
                    </h1>
                    <p className="text-gray-600 text-center mb-8">{langContent.intro}</p>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {langContent.labels.name}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                    placeholder={langContent.placeholders.name}
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {langContent.labels.email}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                    placeholder={langContent.placeholders.email}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700"
                            >
                                {langContent.labels.phone}
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                placeholder={langContent.placeholders.phone}
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mt-6">
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-700"
                            >
                                {langContent.labels.message}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                placeholder={langContent.placeholders.message}
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <div className="mt-8 text-center">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-purple-600 text-white font-medium rounded-md shadow-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            >
                                {langContent.labels.send}
                            </button>
                        </div>
                    </form>

                    {status && <p className="text-center text-gray-600 mt-4">{status}</p>}

                    <div className="mt-10 text-center">
                        <p className="text-gray-600">{langContent.contact}</p>
                        <p className="text-gray-800 font-medium mt-2">
                            {langContent.email}: Knater@gmail.com
                        </p>
                        <p className="text-gray-800 font-medium">
                            {langContent.phone}: 0509111401
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
