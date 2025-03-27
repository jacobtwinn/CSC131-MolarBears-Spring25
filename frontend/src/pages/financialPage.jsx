import {useState} from "react";
import React from "react";
import '/src/pageCSS/financialPage.css';

function FinancialPage() {
    const data = [
        { date: '12 Sept, 2025', operation: 'Check-up', cost: 79, status: 'Paid'},
        { date: '27 Feb, 2025', operation: 'Cavity Filling', cost: 129, status: 'Paid'},
        { date: '14 Dec, 2024', operation: 'Root Canal', cost: 229, status: 'Pending'},
        { date: '21 Aug, 2024', operation: 'Basic Dental Cleaning', cost: 79, status: 'Pending'}
      ];
    return (
        <>
        <head>
            <title>Financial Dashboard</title>
        </head>
        <h3>Financial Homepage</h3>
        <table>
            <thead>
                <tr><th>Date</th><th>Service</th><th>Amount Due</th><th>Status</th></tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.name}>
                        <td>{item.date}</td>
                        <td>{item.operation}</td>
                        <td>${item.cost}</td>
                        <td>{item.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}
export default FinancialPage;