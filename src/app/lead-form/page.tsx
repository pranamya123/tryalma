'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

// Validation Schema with Yup
const validationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  country: yup.string().required('Country of Citizenship is required'),
  linkedin: yup.string().url('Invalid URL').required('LinkedIn URL is required'),
  visaCategories: yup.array().min(1, 'Select at least one visa category'),
  openInput: yup.string().required('Please fill out the open input field'),
});

const LeadForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const router = useRouter();

  const onSubmit = (data: any) => {
    console.log('form data ',data);
    setSubmitted(true);
    setTimeout(() => {
      reset();
    }, 500);
  };

  const handleGoBack = () => {
    router.push('/');
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50 text-gray-800">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="flex flex-col items-center">
            <Image
             src="/info.png"
            alt="Info Icon"
              width={60}
              height={60}
              style={{marginBottom: '1rem'}}
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Thank You</h2>
            <p className="mt-2 text-sm text-gray-500">
              Your information was submitted to our team of immigration attorneys.
              Expect an email from hello@tryalma.ai.
            </p>
            <button
              onClick={handleGoBack}
              className="mt-6 bg-gray-800 text-white rounded-md py-2 px-4 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Go Back to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-stone-50 text-gray-800">
      {/* Top Section */}
      <div
  className="w-full py-12 text-center relative"
  style={{
    height: '20rem',
    backgroundColor:'#D9DEA5',
    backgroundImage: 'url(/title.png)',  
    backgroundSize: 'contain', 
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>

        {/* <div className="flex flex-col items-center justify-center">
          <Image
            src="/alma-logo.png"
            alt="Alma Logo"
            width={80}
            height={30}
          />
          <h1 className="text-4xl font-extrabold text-gray-800 mt-4">
            Get An Assessment Of Your Immigration Case
          </h1>
        </div> */}
      </div>

      {/* Form Section */}
      <div className="max-w-3xl w-full bg-white rounded-lg p-8 mt-8 shadow-md">
        {/* Description */}
        <div className="text-center mb-6">
          <Image
            src="/info.png"
            alt="Info Icon"
            width={60}
            height={60}
            className="mx-auto mb-2" 
          />
          <h2 className="text-xl font-semibold text-gray-700">Want to understand your visa options?</h2>
          <p className="text-gray-500">
            Submit the form below and our team of experienced immigration attorneys will review your information and send a preliminary assessment of your case based on your goals.
          </p>
        </div>


    
<form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
  {/* First Name */}
  <div className="flex justify-center">
    <input
      {...register('firstName')}
      type="text"
      placeholder="First Name"
      className="w-2/3 border p-2 rounded-md text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
  {errors.firstName && <div className="text-red-500 text-center">{errors.firstName.message}</div>}

  {/* Last Name */}
  <div className="flex justify-center">
    <input
      {...register('lastName')}
      type="text"
      placeholder="Last Name"
      className="w-2/3 border p-2 rounded-md text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
  {errors.lastName && <div className="text-red-500 text-center">{errors.lastName.message}</div>}

  {/* Email */}
  <div className="flex justify-center">
    <input
      {...register('email')}
      type="email"
      placeholder="Email"
      className="w-2/3 border p-2 rounded-md text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
  {errors.email && <div className="text-red-500 text-center">{errors.email.message}</div>}
{/* Country of Citizenship */}
  <div className="flex justify-center">
  <select
    {...register('country')}
    defaultValue="" 
    className="w-2/3 border p-1 rounded-md text-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
  >
    <option value="" disabled>
      Country of Citizenship
    </option>
    <option value="india">India</option>
    <option value="canada">Canada</option>
    <option value="china">China</option>
   
  </select>
</div>
{errors.country && <div className="text-red-500 text-center">{errors.country.message}</div>}

  {/* LinkedIn / Website URL */}
  <div className="flex justify-center">
    <input
      {...register('linkedin')}
      type="url"
      placeholder="LinkedIn / Website URL"
      className="w-2/3 border p-2 rounded-md text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
  {errors.linkedin && <div className="text-red-500 text-center">{errors.linkedin.message}</div>}
          {/* Visa Categories of Interest */}
          <div className="mt-8 flex justify-center" style={{marginTop: '2rem'}}>
            <div className="w-4/5">
              <div className="flex flex-col items-center">
                <Image
                  src="/dice.png"
                  alt="Dice Icon"
                  width={60}
                  height={60}
                  style={{marginBottom: '1rem'}}
                />
                <p className="font-bold text-gray-700 text-lg">Visa categories of interest?</p>
              </div>
              <div className="flex flex-col mt-2" style={{ marginLeft: '1rem' }}>
                <label className="block text-gray-700 pl-8">
                  <input {...register('visaCategories')} type="checkbox" value="O-1" className="mr-2" />
                  O-1
                </label>
                <label className="block text-gray-700 pl-8">
                  <input {...register('visaCategories')} type="checkbox" value="EB-1A" className="mr-2" />
                  EB-1A
                </label>
                <label className="block text-gray-700 pl-8"> 
                  <input {...register('visaCategories')} type="checkbox" value="EB-2 NIW" className="mr-2" />
                  EB-2 NIW
                </label>
                <label className="block text-gray-700 pl-8"> 
                  <input {...register('visaCategories')} type="checkbox" value="I don’t know" className="mr-2" />
                  I don’t know
                </label>
              </div>
              {errors.visaCategories && <div className="text-red-500 text-center">{errors.visaCategories.message}</div>}
            </div>
          </div>

  {/* text area for more details */}
  <div className="flex justify-center flex-col items-center">
  <Image
                  src="/heart-icon.png"
                  alt="Heart Icon"
                  width={60}
                  height={60}
                  style={{marginBottom: '1rem'}}
                />
    <p className="font-bold text-gray-700 text-lg mb-2">How can we help you?</p>
    <textarea
      {...register('openInput')}
      placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
      className="w-2/3 border p-2 rounded-md h-48 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
  {errors.openInput && <div className="text-red-500 text-center">{errors.openInput.message}</div>}

  {/* Submit Button */}
  <div className="flex justify-center">
    <button
      type="submit"
      className="w-2/3 mb-8 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
    >
      Submit
    </button>
  </div>
</form>

      </div>
    </div>
  );
};

export default LeadForm;
