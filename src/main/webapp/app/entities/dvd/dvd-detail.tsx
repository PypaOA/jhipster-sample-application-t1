import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './dvd.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const DvdDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const dvdEntity = useAppSelector(state => state.dvd.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="dvdDetailsHeading">
          <Translate contentKey="t1App.dvd.detail.title">Dvd</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{dvdEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="t1App.dvd.name">Name</Translate>
            </span>
          </dt>
          <dd>{dvdEntity.name}</dd>
          <dt>
            <span id="performer">
              <Translate contentKey="t1App.dvd.performer">Performer</Translate>
            </span>
          </dt>
          <dd>{dvdEntity.performer}</dd>
          <dt>
            <span id="releaseYear">
              <Translate contentKey="t1App.dvd.releaseYear">Release Year</Translate>
            </span>
          </dt>
          <dd>{dvdEntity.releaseYear}</dd>
          <dt>
            <span id="discCount">
              <Translate contentKey="t1App.dvd.discCount">Disc Count</Translate>
            </span>
          </dt>
          <dd>{dvdEntity.discCount}</dd>
          <dt>
            <span id="format">
              <Translate contentKey="t1App.dvd.format">Format</Translate>
            </span>
          </dt>
          <dd>{dvdEntity.format}</dd>
          <dt>
            <span id="lang">
              <Translate contentKey="t1App.dvd.lang">Lang</Translate>
            </span>
          </dt>
          <dd>{dvdEntity.lang}</dd>
          <dt>
            <span id="state">
              <Translate contentKey="t1App.dvd.state">State</Translate>
            </span>
          </dt>
          <dd>{dvdEntity.state}</dd>
          <dt>
            <span id="added">
              <Translate contentKey="t1App.dvd.added">Added</Translate>
            </span>
          </dt>
          <dd>{dvdEntity.added ? <TextFormat value={dvdEntity.added} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
        </dl>
        <Button tag={Link} to="/dvd" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/dvd/${dvdEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default DvdDetail;
