import FilmView from "../view/film.js";
import FilmDetailsView from "../view/film-details.js";
import { render, RenderPosition, replace, remove } from "../utils/render.js";
import {UserAction, UpdateType} from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  FILM_DETAILS: 'FILM DETAILS',
};

export default class Task {
  constructor(filmListContainer, changeData, changeMode) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmComponent = null;
    this._filmDetailsComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFilmClick = this._handleFilmClick.bind(this);
    this._handleRemove = this._handleRemove.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(filmData) {
    this._filmData = filmData;

    const prevFilmComponent = this._filmComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = new FilmView(filmData);
    this._filmDetailsComponent = new FilmDetailsView(filmData);

    this._filmComponent.setPopupClickHandler(this._handleFilmClick);
    this._filmDetailsComponent.setRemovePopupClickHandler(this._handleRemove);
    this._filmComponent.setWatchListClickHandler(this._handleWatchlistClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevFilmComponent === null || prevFilmDetailsComponent === null) {
      render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._mode === Mode.FILM_DETAILS) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmDetailsComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmDetailsComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._removePopup();
    }
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      remove(this._filmDetailsComponent);
      document.removeEventListener('keydown', this._escKeyDownHandler);
      this._mode = Mode.DEFAULT;
    }
  }

  _setPopup() {
      render(this._filmListContainer, this._filmDetailsComponent, RenderPosition.BEFOREEND);
      document.addEventListener('keydown', this._escKeyDownHandler);
      this._changeMode();
      this._mode = Mode.FILM_DETAILS;
  }

  _removePopup() {
      remove(this._filmDetailsComponent);
      document.removeEventListener('keydown', this._escKeyDownHandler);
      this._mode = Mode.DEFAULT;
  }

  _handleFilmClick() {
    this._setPopup();
  }

  _handleRemove() {
    this._removePopup();
  }

  _handleWatchlistClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {
        ...this._filmData,
        user_details: {
          ...this._filmData.user_details,
          watchlist: !this._filmData.user_details.watchlist,
        }
      },
    );
  }

  _handleWatchedClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {
        ...this._filmData,
        user_details: {
          ...this._filmData.user_details,
          already_watched: !this._filmData.user_details.already_watched,
        }
      },
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {
        ...this._filmData,
        user_details: {
          ...this._filmData.user_details,
          favorite: !this._filmData.user_details.favorite,
        }
      },
    );
  }
}


