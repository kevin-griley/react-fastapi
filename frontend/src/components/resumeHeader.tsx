import { Container, Title, Paper, List } from '@mantine/core';

export default function ResumeHeader() {

    return (
        <div className='resume-header'>

            <Title> Resume </Title>

            <div>
                <h4>Name: Kevin Griley </h4>
                <h4>Contact Information:</h4>

                <ul>
                    <li>Phone: (714)624-8902 </li>
                    <li>Email: kevin@griley.app </li>

                </ul>

                <h4>Summary:</h4>
                <p>Highly experienced CFO & CTO with 10 years of experience in the logistics industry. Proven track record of managing expenses, implementing and maintaining ERP systems, and increasing company margins. Skilled in data analysis, visual dashboards, and leading projects and teams. Holds a BA in Business Studies with a focus on Management.</p>

            </div>
        </div>
    )
}