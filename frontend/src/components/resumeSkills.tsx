import { Container, Title, Paper, List } from '@mantine/core';

export default function ResumeSkills() {

    return (
        <div className="resume-skills">

            <h4>Education:</h4>
            <p>BA in Business Economics & Management</p>
            <p>Graduated 2012</p>
            <h4>Skills:</h4>
            <ul>

                <li>ERP Systems</li>
                <li>Data Analysis</li>
                <li>Visual Dashboards</li>
                <li>Project Management</li>
                <li>Business Management</li>
                <li>Plotly Dash</li>
                <li>Excel</li>
                <li>Fleet Safety Management</li>
                <li>California and Federal Regulations Compliance</li>
                <li>Legal Process Navigation</li>
                <li>Negotiation and Leadership</li>

            </ul>


            {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}

            <List>
              <List.Item> What is your current job title and how long have you held this position?</List.Item>
              <List.Item> What are your main responsibilities in your current role?</List.Item>
              <List.Item> What are your notable achievements in your current role?</List.Item>
              <List.Item> What are your educational qualifications?</List.Item>
              <List.Item> What is your relevant experience in the field of logistics?</List.Item>
              <List.Item> What are your skills and abilities that make you a good fit for a CFO & CTO role?</List.Item>
              <List.Item> Do you have any relevant certifications or professional development courses?</List.Item>
              <List.Item> Are you fluent in any languages other than English?</List.Item>
              <List.Item> Are you open to remote working or relocation?</List.Item>
              <List.Item> Are you looking for a full-time or part-time position?</List.Item>
            </List>

            <p>
            My Current Job Title is CFO & CTO for Griley Air Freight. 
            I have been working there for about 10 years. 
            I have performed a variety of positions at Griley including Safety Director and Project Manager, 
            I also performed a number of accomplishments including leading a legal case that had a massive document discovery request. 
            I was able to digitize 30,000 documents and perform data analysis on it. 
            </p>
            <p>
            It was my responsibility as CFO to manage all the company expenses and purchases. 
            This meant monitoring accounting costs for different vendors and departments in our comany. 
            Our company managed 8 large Class A fleets and a mechanic shop that serviced 75 Class A vehicles and 100 53' Trailers. 
            I designed a webapplication that tracked all expenses and graphed the overtime. 
            I created a visual dashboard from a program called Plotly Dash which is a Flask Extention. 
            </p>
            <p>
            It was my responsibility as a CTO to manage the technical debt and meet customers integration demands and standards. 
            I designed and built an ERP System of the company, 
            I migrated the company from their legacy system into the new ERP system that I built for them and 
            I worked on that software and continuously added features It was a great application. 
            </p>
            <p>
            Being with the company for 10 years and growing with the company, 
            I was able to see the company transform from a 3% margin to a 22% margin. 
            We also saw a large growth in the amount of employees we had on staff. 
            My abilities are in understanding the big picture and how do get results from the programs that makes me stand above. 
            </p>
            <p>
            I have a BA in Business Studies with a focus on Management. I am not fluent in other languages
            </p>


        </div>
    )
}