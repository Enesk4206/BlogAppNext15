'use client';

import Image from 'next/image';
import { assets, blog_data } from '../../../Assets/assets';
import React, { useEffect, useState } from 'react';

const page = ({ params }) => {
    const [data, setData] = useState(null);
    const [resolvedParams, setResolvedParams] = useState(null); // params'ı çözümlenecek bir state ekliyoruz.

    // fetchBlogData fonksiyonu
    const fetchBlogData = async (id) => {
        // blog_data üzerinde arama yap
        for (let i = 0; i < blog_data.length; i++) {
            if (id === Number(blog_data[i].id)) {
                setData(blog_data[i]);
                console.log(blog_data[i]);
                break;
            }
        }
    };

    useEffect(() => {
        const resolveParams = async () => {
            if (params) {
                const resolved = await params; // params'ı çözümle
                setResolvedParams(resolved); // çözümlenen params'ı state'e aktar
            }
        };

        resolveParams();
    }, [params]);

    useEffect(() => {
        if (resolvedParams && resolvedParams.id) {
            const id = Number(resolvedParams.id);
            fetchBlogData(id);
        }
    }, [resolvedParams]);

    // Loading durumu
    if (!data) return <div>Loading...</div>;

    return (
        <div className='bg-gray-200 p-5 md:px-12 lg:px-28'>
            <div className='flex items-center justify-between'>
                <Image src={assets.logo} width={180} alt='logo' className='w-[130px] sm:w-auto' />
                <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000] '>
                    Get Started <Image src={assets.arrow} alt='arrow icon'/>
                </button>
            </div>
            <div className='text-center my-24'>
                <h1>{data.title}</h1>
            </div>
        </div>
    );
};

export default page;
