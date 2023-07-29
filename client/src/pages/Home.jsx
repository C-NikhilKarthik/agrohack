import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import ImageResizer from 'react-image-file-resizer';
import Footer from '../components/Footer';

function Home() {

  const [defaultImage] = useState('/not-found.jpg'); // Replace this with the path to your default image
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowInstructions(true);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    ImageResizer.imageFileResizer(
      file,
      1000, // maxWidth (change this to the desired max width, e.g., 1000)
      1000, // maxHeight (change this to the desired max height, e.g., 1000)
      'JPEG', // compressFormat (or 'WEBP' for better quality with smaller size)
      100, // quality (change this to the desired quality, e.g., 90 for 90%)
      0, // rotation (0 for no rotation)
      (uri) => {
        setImagePreview(uri);
      },
      'base64' // outputType
    );

  };

  const crops = [
    'Wheat',
    'Corn',
    'Rice',
    'Barley',
    'Soybean',
    'Potato',
    'Tomato',
    'Cotton',
    'Sugar Cane',
    'Coffee',
  ];

  const [selectedCrop, setSelectedCrop] = useState(null);

  const handleCropChange = (crop) => {
    setSelectedCrop(crop);
  };

  return (
    <div className='bg-slate-100 dark:bg-slate-900 w-full'>
      <div className='fixed h-screen bg-cover top-0 w-screen bg-right left-0 bg-[url("https://tailwindcss.com/_next/static/media/1-dark@tinypng.a99d6c93.png")]' />
      <Navbar />
      <div className='h-screen w-full lg:grid lg:grid-cols-2 flex flex-col lg:mt-0 mt-16 gap-6 p-10 justify-items-center place-items-center'>
        <div>
          <h1 className='text-[clamp(32px,6vw,48px)] text-black dark:text-slate-200 font-[500] tracking-[-1.4px] leading-[115%]'>Discover AgriSenseAI:</h1>
          <h1 className='text-[clamp(24px,6vw,30px)] text-slate-700 dark:text-slate-200 font-[500] tracking-[-1.4px] leading-[115%]'>Transforming Agriculture with Cutting-Edge AI Solutions</h1>
          <div className='text-[clamp(14px,4vw,18px)] mt-4 text-slate-500 dark:text-slate-300 '>Empowering Agriculture through AI: Revolutionizing Crop Health and Yield Optimization</div>
        </div>
        <div className='w-full aspect-[3/2] bg-purple-500 rounded-lg'></div>

      </div>

      <div className='w-full p-3 sm:p-10 md:p-20 flex bg-transparent items-center justify-center'>
        <div className='p-6 w-full bg-slate-300/50 dark:bg-slate-950/50 backdrop-blur rounded-lg flex flex-col items-center'>
          <h1 className='text-3xl font-semibold text-slate-800 dark:text-slate-100'>Analyze your Crops</h1>
          <div className='flex flex-col min-h-[60vh] w-full gap-4'>

            {/* Dropdown */}

            <div className='my-10'>
              <div className='text-slate-800 dark:text-slate-100 mb-5'>Select the type of crop you would like to Analyze</div>
              <div className="flex w-full flex-wrap gap-2">
                {crops.map((crop, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 text-sm font-medium ${selectedCrop === crop
                      ? 'text-gray-700 dark:text-slate-200 bg-white dark:bg-slate-700/80 ring-purple-400 ring-2'
                      : 'text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-800'
                      } rounded-md hover:bg-gray-200 dark:hover:bg-slate-600/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    onClick={() => handleCropChange(crop)}
                  >
                    {crop}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                {selectedCrop ? (
                  <p className="text-gray-700 dark:text-slate-200">
                    Upload Image for {selectedCrop}
                  </p>
                ) : (
                  <p className="text-gray-700 dark:text-slate-200">Select a crop</p>
                )}
              </div>
            </div>
            <div className="relative flex w-full gap-6 overflow-x-hidden">
              <div className="relative overflow-hidden w-full">
                <div className={` duration-500 transition-[width] ${showInstructions ? "w-full md:w-1/2" : "w-full"}`}>
                  <label className="inline-block w-min rounded mb-8">
                    <input
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <span className="px-4 py-2 text-sm font-medium bg-purple-500 text-white rounded-l">
                      Choose
                    </span>
                    <span className="px-4 py-2 w-fit whitespace-nowrap text-sm font-medium bg-slate-400 dark:bg-slate-600 text-white rounded-r">
                      Upload Image
                    </span>
                  </label>
                  {imagePreview && (
                    <div className="my-4 w-full flex justify-center">
                      <img src={imagePreview} alt="Uploaded" className="rounded object-contain aspect-[3/2] max-w-2xl w-full" />
                    </div>
                  )}
                </div>
                <div className={`md:w-1/2 w-full h-full md:absolute md:top-0 md:right-0 transition-[transform,opacity] delay-100 duration-500 ${ showInstructions ? "translate-y-0 opacity-100" : "translate-y-[100%] opacity-0"}`}>
                  <h1 className='text-2xl text-slate-800 dark:text-slate-100'>Instructions</h1>
                </div>
              </div>

            </div>
            <div className='flex w-full py-4 justify-end'>
              <button className='bg-purple-500 text-white py-1 px-4 rounded' disabled={imagePreview === defaultImage} onClick={handleSubmit} type='submit'>Upload</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home