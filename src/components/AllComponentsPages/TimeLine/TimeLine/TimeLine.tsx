import React, { useEffect, useRef, useState } from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Timeline, Spin, Button } from 'antd';
import './TimeLine.scss';
import data from '../../../../assets/data';
import { CloseOutlined } from '@ant-design/icons';

const TimeLine = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
    const [activeItemTitle, setActiveItemTitle] = useState<string | null>(null);
    const [activeItemDescription, setActiveItemDescription] = useState<string | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredData, setFilteredData] = useState(data.slice(0, 10)); 
    const [allDataLoaded, setAllDataLoaded] = useState(false);
    const [isNoDataFound, setIsNoDataFound] = useState(false);

    const observer = useRef<IntersectionObserver | null>(null);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const onChangeStartDate = (date: Date | null, dateString: string | string[]) => {
        if (typeof dateString === 'string') {
            setStartDate(date);
        }
    };

    const onChangeEndDate = (date: Date | null, dateString: string | string[]) => {
        if (typeof dateString === 'string') {
            setEndDate(date);
        }
    };

    const handleResetDates = () => {
        setStartDate(null);
        setEndDate(null);
        setActiveItemIndex(null);
        setActiveItemTitle(null);
        setActiveItemDescription(null);
        setIsPopupOpen(false);
    };

    const handleItemClick = (index: number) => {
        setActiveItemIndex(index);
        setActiveItemTitle(data[index].title);
        setActiveItemDescription(data[index].description);
        setIsPopupOpen(true);
    };

    const filterData = data.filter((item) => {
        if (!startDate || !endDate) {
            return true;
        }
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
    });

    useEffect(() => {
        if (filterData.length === 0) {
            setIsNoDataFound(true);
            setIsLoading(false);
        } else {
            setIsNoDataFound(false);
        }

        if (!isLoading) {
            setFilteredData(filterData.slice(0, 10));
        }
    }, [filterData, isLoading]);

    useEffect(() => {
        // Intersection Observer to detect when loader comes into view
        observer.current = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting && !allDataLoaded && !isLoading) {
                    setIsLoading(true); // Trigger loading when loader is in view
                    setTimeout(() => {
                        // Simulate loading delay
                        const newDataChunk = data.slice(filteredData.length, filteredData.length + 8); // Load 8 more items
                        setFilteredData([...filteredData, ...newDataChunk]);
                        setIsLoading(false);
                        if (filteredData.length + 8 >= data.length) {
                            setAllDataLoaded(true);
                        }
                    }, 1000); 
                }
            },
            { threshold: 0.5 }
        );
    
        if (loaderRef.current) {
            observer.current.observe(loaderRef.current);
        }
    
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [filteredData, isLoading, allDataLoaded]);
    

    const renderDescription = () => {
        if (!activeItemDescription) return null;
        const bulletPoints = activeItemDescription.split('\n\n');
        return bulletPoints.map((point, index) => <p key={index}>{point}</p>);
    };

    return (
        <div className="w-auto timeline-wrapper d-flex flex-row mt-3 justify-content-around">
            <div className=" col-xxl-8 left-timeline">
                <div className="wrapper-timeline-dates d-flex align-items-center justify-content-center">
                    <span>Showing Timeline</span>
                    <div className='date-box'>
                        <span>from</span>
                        <DatePicker onChange={onChangeStartDate} value={startDate} placeholder='Start Date' className="datepicker-timeline" />
                        <span>to</span>
                        <DatePicker onChange={onChangeEndDate} value={endDate} placeholder='End Date' className="datepicker-timeline" />
                        <button className='reset-dates-btn' onClick={handleResetDates}>Reset Dates</button>
                    </div>
                </div>
                <div className="timeline-wrapper-main mt-3">
                    {isNoDataFound ? (
                        <div 
                        className="no-data-found text-align-center ">
                            No data found!
                            <br />
                        Please select different dates.
                            </div>
                    ) : (
                        <Timeline
                            mode="alternate"
                            className="xem-timeline"
                            items={filterData.length > 0 ? filterData.map((item, index) => ({
                                className: activeItemIndex === index ? 'active' : '',
                                children: (
                                    <div className='timeline-content' onClick={() => handleItemClick(index)}>
                                        <h5 className='timeline-content-title'>{item.title}</h5>
                                        <span className='timeline-content-date '>{item.date}</span>
                                    </div>
                                ),
                                color: index % 2 === 0 ? '#36454F' : '#7393B3',
                            })) : []}
                        />
                    )}
                    {isLoading && (
                        <div className="loader">
                            <Spin size="large"></Spin>
                        </div>
                    )}
                    {!allDataLoaded && (
                        <div ref={loaderRef} style={{ height: '20px' }}>
                        </div>
                    )}
                </div>
            </div>

            {window.innerWidth <= 992 ? (
                isPopupOpen && (
                    <div className="popup-overlay">
                        <div className="popup-container">
                            <button className="close-popup" onClick={() => setIsPopupOpen(false)}>
                                <CloseOutlined />
                            </button>
                            <div className="popup-title">
                                <h4>{activeItemTitle}</h4>
                            </div>
                            <div className="popup-content">
                                <div className="scroll-content-details">{renderDescription()}</div>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <div className="col-lg-4 col-xl-4 col-xxl-4 right-timeline">
                    <div className="content-timeline p-3">
                        <h4>{activeItemTitle}</h4>
                        <div className="scroll-content-details">{renderDescription()}</div>
                    </div>
                </div>
)}

        </div>
    );
};

export default TimeLine;
