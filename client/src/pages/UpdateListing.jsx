import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from '../Spinner';
import { toast } from 'sonner';

const UpdateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    squareFootage: null,
    yearBuilt: null,
    acre: null,
    rentDuration: 'Annual',
    priceUponRequest: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [priceUponRequest, setPriceUponRequest] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log();
        data.message;
        return;
      }
      setFormData(data);
    };
    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
    if (files.length === 0) {
      toast.warning('Please select images to upload');
      return;
    }

    if (files.length + formData.imageUrls.length > 6) {
      toast.warning('You can only upload 6 images per listing');
      return;
    }

    setUploading(true);
    setImageUploadError(false);

    const imageUploadPromise = new Promise((resolve, reject) => {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            imageUrls: prevFormData.imageUrls.concat(urls),
          }));
          setImageUploadError(false);
          setUploading(false);
          resolve({ name: 'Image upload' });
        })
        .catch((err) => {
          setUploading(false);
          reject(new Error('Image upload failed (2 mb max per image)'));
        });
    });

    toast.promise(imageUploadPromise, {
      loading: 'Uploading images...',
      success: (data) => `${data.name} successful`,
      error: (err) => `${err.message}`,
    });
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;

    if (id === 'sale' || id === 'rent') {
      setFormData((prevState) => ({
        ...prevState,
        type: id,
      }));
    } else if (
      id === 'parking' ||
      id === 'furnished' ||
      id === 'offer' ||
      id === 'priceUponRequest'
    ) {
      setFormData((prevState) => ({
        ...prevState,
        [id]: checked,
      }));
      if (id === 'priceUponRequest') {
        if (checked) {
          setFormData((prevState) => ({
            ...prevState,
            regularPrice: null,
            discountPrice: null,
          }));
        } else {
          setFormData((prevState) => ({
            ...prevState,
            regularPrice: 50, // Default regular price when priceUponRequest is unchecked
          }));
        }
      }
    } else if (
      type === 'number' ||
      type === 'text' ||
      type === 'textarea' ||
      id === 'rentDuration'
    ) {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('you must upload at least one image');
      if (!priceUponRequest && +formData.regularPrice < +formData.discountPrice)
        toast.warning('Discount Price must be lower than regular price');
      setLoading(true);
      setError(false);

      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
          // priceUponRequest,
          squareFootage: formData.squareFootage || null,
          yearBuilt: formData.yearBuilt || null,
          acre: formData.acre || null,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        toast.error(data.message);
        // setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      toast.error(error.message);
      // setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-3xl mx-auto">
      <h1 className="lg:text-3xl text-2xl font-semibold text-center my-7">
        Update Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="outline-[#cbd5e1]  border p-3 rounded-lg"
            id="name"
            maxLength={'62'}
            minLength={'5'}
            required
            onChange={handleChange}
            value={formData.name}
          />

          <input
            type="text"
            placeholder="Address"
            className="outline-[#cbd5e1] border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

          <textarea
            type="text"
            placeholder="Description"
            className="outline-[#cbd5e1] border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex border border-gray-300  p-3 gap-3 rounded-lg">
              <div className="items-center flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="custom-checkbox cursor-pointer"
                  onChange={handleChange}
                  checked={formData.type === 'sale'}
                />{' '}
                <span>Sell</span>
              </div>
              <div className="items-center flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="custom-checkbox cursor-pointer"
                  onChange={handleChange}
                  checked={formData.type === 'rent'}
                />{' '}
                <span>Rent</span>
              </div>
            </div>
            <div className="items-center flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="custom-checkbox cursor-pointer"
                onChange={handleChange}
                checked={formData.offer}
              />{' '}
              <span>Offer</span>
            </div>
            <div className="items-center flex gap-2">
              <input
                type="checkbox"
                id="priceUponRequest"
                className="custom-checkbox cursor-pointer"
                onChange={handleChange}
                checked={formData.priceUponRequest}
              />{' '}
              <span>Price Upon Request</span>
            </div>

            <div className="items-center flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="custom-checkbox cursor-pointer"
                onChange={handleChange}
                checked={formData.parking}
              />{' '}
              <span>Parking spot</span>
            </div>
            <div className="items-center flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="custom-checkbox cursor-pointer"
                onChange={handleChange}
                checked={formData.furnished}
              />{' '}
              <span>Furnished</span>
            </div>

            <div>
              {formData.type === 'rent' && (
                <select
                  id="rentDuration"
                  onChange={handleChange}
                  value={formData.rentDuration}
                  className="p-1 rounded-lg  border  border-gray-300"
                >
                  <option value="Annual">Annual</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Season">Season</option>
                  <option value="Other">Other</option>
                </select>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="  items-center gap-2">
                <p className="font-sans">Beds :</p>{' '}
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="200"
                  required
                  className=" p-2 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
              </div>
              <div className=" items-center gap-2">
                <p className="font-sans">Baths :</p>{' '}
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="200"
                  required
                  className=" p-2 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="  items-center gap-2">
                <p className="font-sans">Sq Ft :</p>{' '}
                <input
                  type="number"
                  id="squareFootage"
                  min="1"
                  className="p-2 w-[90px] border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.squareFootage}
                />
              </div>
              <div className="  items-center gap-2">
                <p className="font-sans">Acre(s) :</p>{' '}
                <input
                  type="text"
                  id="acre"
                  className="p-2 w-[90px] border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.acre}
                />
              </div>
              <div className=" items-center gap-2">
                <p className="font-sans">Year Built :</p>{' '}
                <input
                  type="number"
                  id="yearBuilt"
                  min="1"
                  className="w-[90px]  p-2 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.yearBuilt}
                />
              </div>
            </div>
            {!formData.priceUponRequest && (
              <div className="flex items-start  sm:flex-row  gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="flex flex-col items-center">
                    <p className="font-sans whitespace-nowrap">
                      Regular price{' '}
                    </p>
                    {formData.type === 'rent' && (
                      <span className="text-xs">
                        ($/{formData.rentDuration})
                      </span>
                    )}
                  </div>

                  <input
                    type="number"
                    id="regularPrice"
                    min="50"
                    max="1000000000"
                    required
                    className="py-3 px-[10px] border border-gray-300 rounded-lg"
                    onChange={handleChange}
                    value={formData.regularPrice}
                  />
                </div>
                {formData.offer && (
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <div className="flex flex-col items-center">
                      <p className="font-sans whitespace-nowrap">
                        Discounted price{' '}
                      </p>
                      {formData.type === 'rent' && (
                        <span className="text-xs">
                          ($/{formData.rentDuration})
                        </span>
                      )}
                    </div>
                    <input
                      type="number"
                      id="discountPrice"
                      min="50"
                      max="100000000"
                      required
                      onChange={handleChange}
                      value={formData.discountPrice}
                      className="py-3 px-[10px] border border-gray-300 rounded-lg"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-sans font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="cursor-pointer p-3 border border-gray-400 rounded-lg w-full"
              type="file"
              id="images"
              accept="images/*"
              multiple
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded-lg uppercase hover:shadow-lg disabled:opacity-80"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {/* {imageUploadError && imageUploadError} */}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border border-[#CBD5E1] rounded-lg items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  type="button"
                  className="p-3  text-red-700 rounded-lg uppercase hover:opacity-75 disabled:opacity-80"
                >
                  Remove
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className="mt-5 p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-75 disabled:opacity-80 w-[80%] self-center"
          >
            {loading ? (
              <Spinner className="w-6 h-6 mt-0 mb-0 mx-auto " />
            ) : (
              'Update listing'
            )}
          </button>
          {/* {error && <p className="text-red-700 text-sm">{error}</p>} */}
        </div>
      </form>
    </main>
  );
};

export default UpdateListing;
