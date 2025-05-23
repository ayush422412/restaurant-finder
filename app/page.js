"use client"
import GlobalApi from '@/Shared/GlobalApi';
import BusinessList from '@/components/Home/BusinessList';
import CategoryList from '@/components/Home/CategoryList';
import GoogleMapView from '@/components/Home/GoogleMapView';
import RangeSelect from '@/components/Home/RangeSelect';
import SelectRating from '@/components/Home/SelectRating';
import SkeltonLoading from '@/components/SkeltonLoading';
import { UserLocationContext } from '@/context/UserLocationContext';
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react'
import LocationCheck from '@/components/Home/islocationon';

export default function Home() {

  const { data: session } = useSession();
  const [category, setCategory] = useState();
  const [radius, setRadius] = useState(2500);
  const [businessList, setBusinessList] = useState([]);
  const [businessListOrg, setBusinessListOrg] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const { userLocation, setUserLocation } = useContext(UserLocationContext);

  useEffect(() => {
      if (!session?.user) {
        router.push('/signin')
      }
  }, [session])

  useEffect(() => {
    getGooglePlace();
  }, [category, radius]);

  const getGooglePlace = () => {
      if (category) {
        setLoading(true)

        GlobalApi.getGooglePlace(
          category,
          radius,
          userLocation.lat,
          userLocation.lng
        ).then(resp => {
            setBusinessList(resp.data.product.results);
            setBusinessListOrg(resp.data.product.results);
            setLoading(false)
        });
      }
  }

  const onRatingChange = (ratings) => {
    if (ratings.length === 0) {
      setBusinessList(businessListOrg);
      return;
    }

    const filterData = businessListOrg.filter((item) =>
      ratings.some((r) => Number(item.rating) >= Number(r))
    );

    setBusinessList(filterData);
  };

  return (
    <>
      <LocationCheck />
      <div className='grid grid-cols-1 md:grid-cols-4'>
        <div className='p-3'>
          <CategoryList onCategoryChange={(value) => setCategory(value)} />
          <RangeSelect onRadiusChange={(value) => setRadius(value)} />
          <SelectRating onRatingChange={(value) => onRatingChange(value)} />
        </div>
  
        <div className='col-span-3'>
          <GoogleMapView businessList={businessList} />
          <div className='md:absolute mx-2 w-[90%] md:w-[74%] bottom-36 relative md:bottom-3'>
            {!loading ? (
              <BusinessList businessList={businessList} />
            ) : (
              <div className='flex gap-3'>
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <SkeltonLoading key={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}