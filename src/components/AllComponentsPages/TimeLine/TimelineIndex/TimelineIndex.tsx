

import TimeLine from '../TimeLine';
import './TimelineIndex.scss'
const TimelineIndex = () => {
    return (
        <div className="wrapper-timeline-components h-100">
            <div className="wrapper-inner-timeline-components d-flex flex-column align-items-center justify-content-between position-relative h-100">
                <div className="w-100 wrapper-timeline-content d-flex flex-column">
                    <div className="title-part-timeline d-flex flex-column">
                        <h3 className="wd-title m-0">Timeline</h3>
                        <span>Timeline helps you to find out all tasks and history.</span>
                    </div>
                </div>
                <div className='w-100 timeline-timeline-wrapper h-100'>
                    <TimeLine />
                </div>
            </div>
        </div>
    );
};

export default TimelineIndex;