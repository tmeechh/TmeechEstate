import { useState } from 'react';

import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import { toast } from 'sonner';
import Spinner from '../Spinner';

const Contact = ({ listing }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    errors: {
      firstName: false,
      lastName: false,
      email: false,
    },
    isTouched: {
      firstName: false,
      lastName: false,
      email: false,
    },
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: !value.trim() && prevState.isTouched[name],
      },
      isTouched: {
        ...prevState.isTouched,
        [name]: true,
      },
    }));
  }

  const message = `
        First Name: ${formData.firstName}
        Last Name: ${formData.lastName}
        Email: ${formData.email}
        Phone: ${formData.phone || 'N/A'}
        Message: ${formData.message}
      `;

  async function handleSubmit(event) {
    event.preventDefault();

    // Validate all required fields
    const errors = {
      firstName: !formData.firstName.trim(),
      lastName: !formData.lastName.trim(),
      email: !formData.email.trim(),
    };

    setFormData((prevState) => ({
      ...prevState,
      errors: errors,
      isTouched: {
        firstName: true,
        lastName: true,
        email: true,
        // message: true,
      },
    }));

    const hasErrors = Object.values(errors).some((error) => error);

    if (!hasErrors) {

      setLoading(true);
      try {
        const response = await fetch('/api/contact/listing-inquiry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            listingAddress: listing.address, // Include the address here
          }),
        });

        if (response.ok) {
          setIsSubmitted(true);
          setLoading(false);
      
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: '',
            errors: {},
            isTouched: {},
          });
        } else {
          const errorData = await response.json();
          toast.error(` ${errorData.message}`);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('There was an error submitting the form.');
        setLoading(false);
      }
    }
  }

  return (
    <>
      

      <div className='lg:w-[70%] mx-auto'>
        {isSubmitted ? (
          <div className="xl:  flex flex-col ">
            <p className="text-xl lg:text-3xl text-[#333333]">
              Thanks for your interest, We will <br className="hidden" /> get
              back to you shortly.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-4 uppercase text-[#333333] font-josefin  p-2 flex gap-2 items-center text-[12px] lg:text-[15px]"
            >
              Send Another Message
              <ArrowLongRightIcon className="w-8 text-[#333333] h-6 mb-[-20px] transform  -translate-y-1/2 transition-transform duration-300 ease-in-out hover:translate-x-2 hover:scale-110 flex items-center justify-center" />
            </button>
          </div>
        ) : (
          <div>
            <h1 className="lg:text-3xl text-slate-600 mb-8 text-2xl">
              Lets get in touch
            </h1>
            <form
              className="sm:grid sm:grid-cols-2 flex flex-col gap-12"
              onSubmit={handleSubmit}
            >
              <div>
                {formData.errors.firstName && formData.isTouched.firstName && (
                  <p className="text-red-500 text-sm">
                    This field is required.
                  </p>
                )}
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`border-b w-full font-josefin text-[12px] md:text-[18px] placeholder-slate-400 outline-none bg-transparent text-[#333333] ${
                    formData.errors.firstName
                      ? 'border-red-500'
                      : 'border-[#333333]'
                  }`}
                />
              </div>
              <div>
                {formData.errors.lastName && formData.isTouched.lastName && (
                  <p className="text-red-500 text-sm">
                    This field is required.
                  </p>
                )}
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`border-b  w-full font-josefin text-[12px] md:text-[18px] placeholder-slate-400 outline-none bg-transparent text-[#333333] ${
                    formData.errors.lastName
                      ? 'border-red-500'
                      : 'border-[#333333]'
                  }`}
                />
              </div>
              <div>
                {formData.errors.email && formData.isTouched.email && (
                  <p className="text-red-500 text-sm col-span-2">
                    This field is required.
                  </p>
                )}
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`border-b  w-full font-josefin text-[12px] md:text-[18px] placeholder-slate-400 outline-none bg-transparent text-[#333333] ${
                    formData.errors.email
                      ? 'border-red-500'
                      : 'border-[#333333]'
                  }`}
                />
              </div>
              <input
                type="number"
                name="phone"
                placeholder="Phone Number (Optional)"
                value={formData.phone}
                onChange={handleInputChange}
                className="border-b outline-none font-josefin w-full  text-[12px] md:text-[18px]  placeholder-slate-400 border-[#333333] bg-transparent text-[#333333]"
              />
              <div className="col-span-2">
                <p className="text-slate-400 font-josefin text-[12px] md:text-[18px]  pb-3">
                  Message(Optional)
                </p>

                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full h-28 p-3 text-[12px] font-josefin md:text-[18px]  placeholder-slate-400 border-[#333333] outline-none border bg-transparent text-[#333333] "
                    placeholder={`I'm Interested In The property at ${listing.address.split(' ').slice(0, 2).join(' ')}`}

                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="uppercase whitespace-nowrap text-[12px] md:text-[16px] flex items-center disabled:opacity-75 hover:opacity-75  w-fit gap-4 bg-[#0b1636] text-white py-5 px-9 col-span-2"
              >
                {loading ? (
                  <Spinner className="w-7 h-7 border-white mt-0 mb-0 mx-auto" />
                ) : (
                  <>
                    Send Message
                    <ArrowLongRightIcon className="w-8 h-6 mb-[-20px] transform text-white -translate-y-1/2 transition-transform duration-300 ease-in-out hover:translate-x-2 hover:scale-110 flex items-center justify-center" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Contact;
