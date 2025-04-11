import React, {useEffect, useStatuse} from "react";
import "../CSS/DentalHistory.css";

const FinancialInfoPage = () => 
	{
		const [history, setHistory] = useState([]);
        const [filteredHistory, setFilteredHistory] = useState([]);
        const [filter, setFilter] = useState({date: "", type: "", price: ""});

		useEffect(() =>
		{
			fetch("https://http://localhost:5000/api/dental-history/api/financial")
				.then((res) => res.json())
				.then((json) => 
                {
                    setHistory(data);
                    setFiltered(data);
                })
                .catch((err) => console.error("Error fetching Dental History:", err));
		}, []);

		const handleFilterChange = (e) =>
        {
            const {name, value} = e.target;
            const newFilter = ({...filter, [name]: value});

            setFilter(newFilter);

            const filteredData = history.filter((item) =>
            {
                return (
                    (newFilter.date === "" || item.date.includes (newFilter.date)) &&
                    (newFilter.type === "" || item.treatmentType.includes === newFilter.type) &&
                    (newFilter.price === "" || item.price.toString().includes(newFilter.price))
                );
            });

            setFiltered(filteredData);
        };

		return (
			<div className = "dental-history-container">
				<h1>My Dental History</h1>

				<div className = "filters">
					<input
						type = "text"
						name = "date"
						placeholder = "Date"
						value = {filter.date}
						onChange = {handleFilterChange}
					/>

					<input
						type = "text"
						name = "type"
						placeholder = "Treatment Type"
						value = {filter.type}
						onChange = {handleFilterChange}
					/>

					<input
						type = "text"
						name = "price"
						placeholder = "Price"
						value = {filter.price}
						onChange = {handleFilterChange}
					/>
				</div>
                
                {filteredData.length === 0 ? (
                    <p>No dental history found. Schedule your appointment today!</p>
                ) : (
                    <ul className = "history-list">
                        {filtered.map((record, index) => (
                            <li key = {index} className = "history-item">
                                <p><strong>Date:</strong> {record.date}</p>
                                <p><strong>Dentist:</strong> {record.dentist}</p>
                                <p><strong>Treatment Type:</strong> {record.treatmentType}</p>
                                <p><strong>Notes:</strong> {record.notes}</p>
                                <p><strong>Price:</strong> ${record.price}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };

    export default DentalHistoryPage;
                
