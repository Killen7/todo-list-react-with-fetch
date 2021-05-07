import React, { useState, useEffect } from "react";

export const TodoList = () => {
	const [tarea, setTarea] = useState();
	const [listaTareas, setListaTareas] = useState([]);
	const [showError, setShowError] = useState(false);

	const [mouseover, setMouseover] = useState();

	useEffect(() => {
		getData();
	}, []);

	const agregarTarea = event => {
		event.preventDefault();
		let newListaTareas = [...listaTareas, { label: tarea, done: false }];
		setListaTareas(newListaTareas);
		setTarea("");
		updateData(newListaTareas);
	};

	const eliminarTarea = i => {
		let newListaTareas = listaTareas.filter((element, index) => {
			if (i != index) return element;
		});
		setListaTareas(newListaTareas);
		updateData(newListaTareas);
	};

	const getData = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/killen")
			.then(resp => resp.json())
			.then(data => setListaTareas(data))
			.catch(error => setShowError(true));
	};

	const updateData = updatedList => {
		let updatedListToSend = JSON.stringify(updatedList);
		let options = {
			method: "PUT",
			body: updatedListToSend,
			headers: {
				"Content-Type": "application/json"
			}
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/killen",
			options
		)
			.then(resp => resp.json())
			.then(data => console.log(data))
			.catch(error => console.log(error));
	};

	return (
		<div>
			<form onSubmit={tarea ? agregarTarea : e => e.preventDefault()}>
				<div className="container d-flex flex-column">
					<h1 className="display-1 mx-auto">todos</h1>
					<div className="form-group shadow mt-5 blanco mb-0 d-flex">
						<input
							type="text"
							onChange={e => setTarea(e.target.value)}
							className="outlinenone py-3 display-4 border-0 pl-3 d-flex"
							placeholder="Escribe tu tarea aqui"
							value={tarea}
						/>
						<button
							type="submit"
							className="btn btn-outline-dark mr-3 my-auto ml-3">
							<i className="my-auto mx-auto fas fa-plus"></i>
						</button>
					</div>
					<div className="list-group shadow blanco">
						{listaTareas.map((tarea, index) => {
							return (
								<a
									href="#"
									key={index}
									onMouseOver={() => {
										setMouseover(index);
									}}
									onMouseOut={() => {
										setMouseover();
									}}
									className="border-right-0 border-left-0 list-group-item list-group-item-action list-group-item-light">
									<span className="d-flex display-4 justify-content-between">
										<span>
											{showError
												? "Cargando..."
												: tarea.label}
										</span>{" "}
										<span
											className={
												"cruz" +
												(mouseover == index
													? "activo"
													: "")
											}
											onClick={() => {
												eliminarTarea(index);
											}}>
											<h1 className="h3">X</h1>
										</span>
									</span>
								</a>
							);
						})}
						<div className="border-right-0 border-left-0 p-2 list-group-item list-group-item-light">
							{listaTareas.length == 0
								? "No hay tareas"
								: "Hay " + listaTareas.length + " tareas"}
						</div>
					</div>
					<div className="p-1 cajita1 border-top-0 mx-auto list-group-item list-group-item-light"></div>
					<div className="p-1 cajita2 mx-auto list-group-item list-group-item-light"></div>
				</div>
			</form>
		</div>
	);
};
