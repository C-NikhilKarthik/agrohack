import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import ImageResizer from 'react-image-file-resizer';
import Footer from '../components/Footer';

function Home() {

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Resize the image before displaying (optional)
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

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('Select a Crop');

  const handleCropChange = (crop) => {
    setSelectedCrop(crop);
    closeDropdown();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className='bg-slate-100 dark:bg-slate-900 w-full'>
      <Navbar />
      <div className='h-screen w-full bg-cover bg-center bg-[url("https://assets-global.website-files.com/5b26e3fda3234fe366aa392d/647d5adad3cfe3869aa1d955_partners-ty-bg.svg")] lg:grid lg:grid-cols-2 flex flex-col gap-6 p-10 justify-items-center place-items-center'>
        <div>
          <h1 className='text-[clamp(32px,6vw,48px)] text-black dark:text-slate-200 font-[500] tracking-[-1.4px] leading-[115%]'>Discover AgriSenseAI:</h1>
          <h1 className='text-[clamp(24px,6vw,30px)] text-slate-700 dark:text-slate-200 font-[500] tracking-[-1.4px] leading-[115%]'>Transforming Agriculture with Cutting-Edge AI Solutions</h1>
          <div className='text-[clamp(14px,4vw,18px)] mt-4 text-slate-500 dark:text-slate-300 '>Empowering Agriculture through AI: Revolutionizing Crop Health and Yield Optimization</div>
        </div>
        <div className='w-full aspect-[3/2] bg-purple-500 rounded-lg'></div>

      </div>

      <div className='w-full p-3 sm:p-10 md:p-20 flex items-center justify-center'>
        <div className='p-6 w-full bg-slate-300 dark:bg-slate-950 rounded-lg flex flex-col items-center'>
          <h1 className='text-2xl font-semibold text-slate-800 dark:text-slate-100'>Upload the Image</h1>
          <div className='flex min-h-[50vh] w-full gap-4'>

            {/* Dropdown */}

            <div className="relative inline-block text-left">
              <div>
                <span className="rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={toggleDropdown}
                    className="inline-flex justify-center w-44 px-4 py-2 text-sm font-medium text-gray-700 dark:bg-slate-700/80 dark:text-slate-200 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    id="dropdown-menu"
                    aria-haspopup="true"
                    aria-expanded={isOpen ? 'true' : 'false'}
                  >
                    {selectedCrop}
                    <svg
                      className={`${isOpen ? 'transform rotate-180' : ''
                        } -mr-1 ml-2 h-5 w-5`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              </div>

              {isOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white/40 dark:bg-slate-600/40 backdrop-blur ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="dropdown-menu"
                >
                  <div className="py-1" role="none">
                    {crops.map((crop, index) => (
                      <button
                        key={index}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-purple-200/70 hover:text-gray-900"
                        role="menuitem"
                        onClick={() => handleCropChange(crop)}
                      >
                        {crop}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 w-full">
              {imagePreview && (
                <div className="my-4">
                  <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-2">Uploaded Image:</h3>
                  <img src={imagePreview} alt="Uploaded" className="rounded object-cover w-full" />
                </div>
              )}
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageChange}
                className="border border-slate-500 rounded p-2"
              />

            </div>

          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Home