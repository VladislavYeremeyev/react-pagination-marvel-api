import React, { Component } from "react";
import axios from "axios";
import Pagination from "../../Pagination";
import HeroCard from "../../HeroCard";
import styled from "styled-components";
import classNames from "classnames";
import styles from "./CharacterList.module.css";

const StyledLoading = styled.h3`
  color: red;
  transform: translateX(-50%);
  margin-top: 40px;
  position: absolute;
  left: 50%;
`;

class CharactersList extends Component {
  state = {
    allHeroesAmount: 1491, //hardcoded :(
    currentHeroes: [],
    currentPage: null,
    totalPages: null,
    pageLimit: 20,
    loading: false,
  };

  onPageChanged = (data) => {
    const { currentPage, totalPages, pageLimit } = data;
    this.setState({ loading: true });

    axios
      .get(`${process.env.REACT_APP_API_URL}/v1/public/characters`, {
        params: {
          apikey: process.env.REACT_APP_MARVEL_API_KEY,
          limit: pageLimit,
          offset: currentPage * pageLimit,
        },
      })
      .then((response) => {
        const currentHeroes = response.data.data.results;
        const allHeroesAmount = response.data.data.total;
        this.setState({
          currentPage,
          currentHeroes,
          totalPages,
          allHeroesAmount,
          pageLimit,
          loading: false,
        });
      });
  };

  render() {
    const {
      allHeroesAmount,
      currentHeroes,
      currentPage,
      totalPages,
      pageLimit,
    } = this.state;

    if (allHeroesAmount === 0) return null;

    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-gray border-right" : "",
    ]
      .join(" ")
      .trim();

    return (
      <div className="container mb-5">
        {this.state.loading && <StyledLoading>Loading...</StyledLoading>}
        <div
          className={classNames("row d-flex flex-row py-5", {
            [styles.blured]: this.state.loading,
          })}
        >
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <h2 className={headerClass}>
                <strong className="text-secondary">{allHeroesAmount}</strong>{" "}
                Characters
              </h2>

              {currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{currentPage}</span> /{" "}
                  <span className="font-weight-bold">{totalPages}</span>
                </span>
              )}
            </div>

            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination
                totalRecords={allHeroesAmount}
                pageLimit={pageLimit}
                pageNeighbours={1}
                onPageChanged={this.onPageChanged}
              />
            </div>
          </div>

          {currentHeroes.map((hero) => (
            <HeroCard key={hero.id} hero={hero} />
          ))}
        </div>
      </div>
    );
  }
}

export default CharactersList;
