import React, {useState} from "react";
import emailJs from "@emailjs/browser";
import HeaderV2Hebrew from "../NavBar/HeaderV2Hebrew";

const ContactUsHebrew = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [status, setStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSubmitting) {
            setStatus("אנא המתן לפני שליחת הודעה נוספת.");
            return;
        }

        setIsSubmitting(true);
        setStatus("שולח...");

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            message: formData.message,
            to_name: "קנטר",
        };

        emailJs
            .send(
                "service_a0ije04",
                "template_64gnlra",
                templateParams,
                "YBfqzMmaitT7ufnv_"
            )
            .then(
                (response) => {
                    console.log("SUCCESS!", response.status, response.text);
                    setStatus("ההודעה נשלחה בהצלחה!");
                    setFormData({name: "", email: "", phone: "", message: ""});
                    setTimeout(() => setIsSubmitting(false), 30000);
                },
                (error) => {
                    console.error("FAILED...", error);
                    setStatus("שליחת ההודעה נכשלה. אנא נסה שוב.");
                    setIsSubmitting(false);
                }
            );
    };

    return (
        <>
            <HeaderV2Hebrew />
            <div
                className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">צור קשר</h1>
                    <p className="text-gray-600 text-center mb-8">
                        נשמח לשמוע ממך! מלא את הטופס למטה או צור קשר באמצעות האימייל או הטלפון שלנו.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name"
                                       className="block text-sm font-medium text-gray-700">
                                    שם מלא
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                    placeholder="הכנס את שמך המלא"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email"
                                       className="block text-sm font-medium text-gray-700">
                                    כתובת אימייל
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                    placeholder="הכנס את כתובת האימייל שלך"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="phone"
                                   className="block text-sm font-medium text-gray-700">
                                מספר טלפון
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                placeholder="הכנס את מספר הטלפון שלך"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mt-6">
                            <label htmlFor="message"
                                   className="block text-sm font-medium text-gray-700">
                                הודעה
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                placeholder="כתוב כאן את ההודעה שלך"
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
                                שלח הודעה
                            </button>
                        </div>
                    </form>

                    {status && <p className="text-center text-gray-600 mt-4">{status}</p>}

                    <div className="mt-10 text-center">
                        <p className="text-gray-600">ניתן גם ליצור איתנו קשר ב:</p>
                        <p className="text-gray-800 font-medium mt-2">אימייל: Knater@gmail.com</p>
                        <p className="text-gray-800 font-medium">טלפון: 0509111401</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactUsHebrew;
