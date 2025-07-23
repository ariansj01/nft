'use client'
import * as React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Select } from 'antd';

export default function Header(){

    const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    };

    return(
        <section className="flex justify-center items-center flex-col gap-3 mt-5 border-b-1 mb-2 border-stone-600">
            <h2 className='text-center mb-[5vh] mt-3 text-4xl font-bold'>NFT <span className='bg-gradient-to-r from-[#EFDA1C] to-[#00ffe0] text-transparent bg-clip-text' >Marketplace</span></h2>
            <p>this is the test for the marketPlace</p>
            <div className="mt-[10vh]">
            <Input placeholder="Search" prefix={<UserOutlined />} />
            </div>
            <div className="flex justify-center items-center gap-3 my-5">
                <Select
                    defaultValue="Category"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: 'Category', label: 'Category' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'Yiminghe', label: 'yiminghe' },
                        { value: 'disabled', label: 'Disabled'},
                    ]}
                />
                <Select
                    defaultValue="Creator"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: 'Category', label: 'Category' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'Yiminghe', label: 'yiminghe' },
                        { value: 'disabled', label: 'Disabled'},
                    ]}
                />
                <Select
                    defaultValue="نوع فروش"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: 'Category', label: 'Category' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'Yiminghe', label: 'yiminghe' },
                        { value: 'disabled', label: 'Disabled'},
                    ]}
                />
                <Select
                    defaultValue="price"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: 'Category', label: 'Category' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'Yiminghe', label: 'yiminghe' },
                        { value: 'disabled', label: 'Disabled'},
                    ]}
                />
                <Select
                    defaultValue="وضعیت مالکیت"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: 'Category', label: 'Category' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'Yiminghe', label: 'yiminghe' },
                        { value: 'disabled', label: 'Disabled'},
                    ]}
                />
                <Select
                    defaultValue="score"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: 'Category', label: 'Category' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'Yiminghe', label: 'yiminghe' },
                        { value: 'disabled', label: 'Disabled'},
                    ]}
                />
                <Select
                    defaultValue="sort by"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: 'Category', label: 'Category' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'Yiminghe', label: 'yiminghe' },
                        { value: 'disabled', label: 'Disabled'},
                    ]}
                />
                
            </div>
        </section>
    )
}