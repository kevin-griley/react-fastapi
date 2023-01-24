import { Container, Title, Paper, List } from '@mantine/core';

export default function ResumeExperience() {

    return (
        <div className="resume-experience">

            <h4>Work Experience:</h4>

            <h5>CFO & CTO</h5>
            <h6>Griley Air Freight</h6>
            <p>July 2016 - Present</p>
            <ul>

                <li>Manage all company expenses and purchases, monitoring accounting costs for different vendors and departments</li>
                <li>Designed and built an ERP system for the company and migrated it from a legacy system</li>
                <li>Led a legal case with a massive document discovery request, digitized 30,000 documents and performed data analysis on it</li>
                <li>Successfully increased company margin from 3% to 22%</li>
                <li>Designed a web application using Plotly Dash that tracks all expenses and graphs the overtime</li>

            </ul>
            <h5>Safety Director</h5>
            <h6>Griley Air Freight</h6>
            <p>July 2014 - June 2016</p>
            <ul>

                <li>Coordinated safety training for all employees and implemented safety protocols</li>
                <li>Implemented and maintained electronic documentation, increasing efficiency and reducing the need for excessive file keeping</li>
                <li>Passed BIT Inspection and won California Safest Fleet award multiple times</li>
                <li>Led efforts to train mechanics to use electronic documentation system effectively</li>
                <li>Demonstrated in-depth understanding of California and federal regulations in the logistics industry</li>
                <li>Led and managed a team to achieve company's safety goals</li>

            </ul>
            <h5>Project Manager</h5>
            <h6>Griley Air Freight</h6>
            <p>May 2012 - June 2014</p>
            <ul>

                <li>Led multiple logistics projects, ensuring on-time and on-budget completion</li>
                <li>Led a project to migrate independent contractors out of the company and move them onto a separate corporation which obtained a federal DOT Freight Broker License</li>
                <li>Automated dispatching process through serverless function network and web hook integration using a service like zapier</li>
                <li>Demonstrated strong negotiation and leadership skills, obtained the trust and cooperation of independent contractors</li>
                <li>Led and managed a team effectively to achieve long-term goals of the company and reduce risk</li>

            </ul>


        </div>
    )
}