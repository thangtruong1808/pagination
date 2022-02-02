import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
	state = {
		movies: getMovies(),
		pageSize: 3,
		currentPage: 1,
	};
	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
		//console.log("Like, Clicked", movie);
	};
	handlePageChange = (page) => {
		this.setState({ currentPage: page });
		console.log("handlePageChange: ", page);
	};
	handleDelete = (movie) => {
		const movies_filtered = this.state.movies.filter(
			(m) => m._id !== movie._id
		);
		this.setState({ movies: movies_filtered });
	};
	getBadgeClasess() {
		let classes = "badge m-2 bg-";
		const { length: countMovies } = this.state.movies;
		classes += countMovies === 0 ? "success" : "info";
		return classes;
	}

	render() {
		const { length: countMovies } = this.state.movies;
		const { pageSize, currentPage, movies: allMovies } = this.state;
		if (countMovies === 0) {
			return (
				<p className={this.getBadgeClasess()}>
					There are no movies in the database.
				</p>
			);
		}

		const movies = paginate(allMovies, currentPage, pageSize);
		return (
			<div>
				<p className={this.getBadgeClasess()}>
					Showing {countMovies} movies in the databse
				</p>
				<table className="table">
					<thead>
						<tr>
							<th>Title</th>
							<th>Genre</th>
							<th>Stock</th>
							<th>Rate</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{movies.map((movie) => (
							<tr key={movie._id}>
								<td>{movie.title}</td>
								<td>{movie.genre.name}</td>
								<td>{movie.numberInStock}</td>
								<td>{movie.dailyRentalRate}</td>
								<td>
									<Like
										liked={movie.liked}
										onClick={() => this.handleLike(movie)}
									/>
								</td>
								<td>
									<button
										onClick={() => this.handleDelete(movie)}
										className="btn btn-danger btn-sm"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<Pagination
					itemsCount={countMovies}
					pageSize={pageSize}
					currentPage={currentPage}
					onPageChange={this.handlePageChange}
				/>
			</div>
		);
	}
}

export default Movies;
