import { useAuth } from "@context/auth";
import { api } from "@lib/api";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ShopkeeperSchedule() {
	const [weekdays, setWeekdays] = useState([
		["Sunday", ""],
		["Monday", ""],
		["Tuesday", ""],
		["Wednesday", ""],
		["Thursday", ""],
		["Friday", ""],
		["Saturday", ""],
	]);
	const [isSchedulePresent, setIsSchedulePresent] = useState(false);

	const { user } = useAuth();

	useEffect(() => {
		// Check if shopper schedule is present
		api.get(`/schedule/get_schedule/${user.id}`).then((response) => {
			if (response.data) {
				setIsSchedulePresent(true);
				setWeekdays(JSON.parse(response.data[0].schedule_day));
			}
		});
	}, [user.id]);

	const handleScheduleSubmit = async () => {
		try {
			const weekdaysJson = JSON.stringify(weekdays);
			// console.log(weekdaysJson);

			api.post(`/add_schedule`, {
				shopper_id: user.id,
				schedule_day: weekdaysJson,
			}).then((response) => {
				toast(response.data.message);
				setIsSchedulePresent(true);
			});
		} catch (error) {
			console.error(
				"An error occurred while submitting the schedule:",
				error
			);
		}
	};

	const handleScheduleEdit = async () => {
		try {
			const weekdaysJson = JSON.stringify(weekdays);
			// console.log(weekdaysJson);

			api.post(`/schedule/edit_schedule/${user.id}`, {
				shopper_id: user.id,
				schedule_day: weekdaysJson,
			}).then((response) => {
				toast(response.data.message);
				setIsSchedulePresent(true);
			});
		} catch (error) {
			console.error(
				"An error occurred while submitting the schedule:",
				error
			);
		}
	};

	const handleWeekdayChange = (index, value) => {
		const updatedWeekdays = [...weekdays];
		// console.log(updatedWeekdays);
		updatedWeekdays[index] = value;
		setWeekdays(updatedWeekdays);
	};

	return (
		<div className="body-wrapper space-pb--120 mt-10 bg-gray-50">
			<h1 className="flex flex-row">Shopkeeper Schedule</h1>
			{isSchedulePresent == true ? (
				<>
					<h2>Edit Your Schedule</h2>
					<div className="flex flex-row">
						{weekdays.map((weekday, index) => (
							<div key={index}>
								<h2>{weekday[0]}</h2>
								<input
									type="text"
									value={weekday[1]}
									onChange={(event) => {
										handleWeekdayChange(index, [
											weekday[0],
											event.target.value,
										]);
										// console.log(event.target.value);
									}}
								/>
							</div>
						))}
					</div>
					<button onClick={handleScheduleEdit}>
						Submit Schedule
					</button>
				</>
			) : (
				<>
					<h2>Add Your Schedule</h2>
					<div className="flex flex-row">
						{weekdays.map((weekday, index) => (
							<div key={index}>
								<h2>{weekday[0]}</h2>
								<input
									type="text"
									value={weekday[1]}
									onChange={(event) => {
										handleWeekdayChange(index, [
											weekday[0],
											event.target.value,
										]);
										// console.log(event.target.value);
									}}
								/>
							</div>
						))}
					</div>
					<button onClick={handleScheduleSubmit}>
						Submit Schedule
					</button>
				</>
			)}
		</div>
	);
}
