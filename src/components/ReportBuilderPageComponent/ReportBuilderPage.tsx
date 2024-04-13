import React, { useState } from 'react';
import './ReportBuilderPage.scss';
import TimelineIndex from '../AllComponentsPages/TimeLine/TimelineIndex';


const ReportbuilderPageComponent = () => {
    return (
        <div className="page-wrapper">
            <section className="create-Report-Form-Header ps-4 pe-4" >
                <TimelineIndex />
            </section>
        </div>
    );
};

export default ReportbuilderPageComponent;