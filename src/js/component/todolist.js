import React, { useState } from "react";

export const TodoList = () => {
	const [tarea, setTarea] = useState("");
	const [listaTareas, setListaTareas] = useState([
		"pasear al perro",
		"tender la cama"
	]);
	const [mouseover, setMouseover] = useState("");

	const agregarTarea = event => {
		event.preventDefault();
		setListaTareas([
			...listaTareas,
			{
				id: listaTareas.length,
				name: tarea
			}
		]);
		setTarea("");
	};

	return (
		<div>
			<form>
				<div className="container d-flex flex-column">
					<h1 className="display-1 mx-auto">todos</h1>
					<div className="form-group d-flex">
						<input
							type="text"
							className="form-control"
							placeholder="Escribe tu tarea aqui"
						/>
						<button type="submit" className="btn btn-primary ml-3">
							Submit
						</button>
					</div>
					<div className="list-group">
						{listaTareas.map((tareas, index) => {
							return (
								<div
									href="#"
									key={index}
									onMouseOver={() => {
										setMouseover(index);
									}}
									onMouseOut={() => {
										setMouseover("");
									}}
									className="border-right-0 border-left-0 list-group-item list-group-item-action list-group-item-light">
									<span className="d-flex justify-content-between">
										<span>{tareas}</span>{" "}
										<span
											className={
												"cruz " +
												(mouseover == index
													? "activo"
													: "")
											}>
											X
										</span>
									</span>
								</div>
							);
						})}
						<div className="border-right-0 border-left-0 list-group-item list-group-item-action list-group-item-light"></div>
					</div>
				</div>
			</form>
		</div>
	);
};
