import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './cd.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const CdDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const cdEntity = useAppSelector(state => state.cd.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="cdDetailsHeading">
          <Translate contentKey="t1App.cd.detail.title">Cd</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{cdEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="t1App.cd.name">Name</Translate>
            </span>
          </dt>
          <dd>{cdEntity.name}</dd>
          <dt>
            <span id="performer">
              <Translate contentKey="t1App.cd.performer">Performer</Translate>
            </span>
          </dt>
          <dd>{cdEntity.performer}</dd>
          <dt>
            <span id="releaseYear">
              <Translate contentKey="t1App.cd.releaseYear">Release Year</Translate>
            </span>
          </dt>
          <dd>{cdEntity.releaseYear}</dd>
          <dt>
            <span id="discCount">
              <Translate contentKey="t1App.cd.discCount">Disc Count</Translate>
            </span>
          </dt>
          <dd>{cdEntity.discCount}</dd>
          <dt>
            <span id="medium">
              <Translate contentKey="t1App.cd.medium">Medium</Translate>
            </span>
          </dt>
          <dd>{cdEntity.medium}</dd>
          <dt>
            <span id="label">
              <Translate contentKey="t1App.cd.label">Label</Translate>
            </span>
          </dt>
          <dd>{cdEntity.label}</dd>
          <dt>
            <span id="state">
              <Translate contentKey="t1App.cd.state">State</Translate>
            </span>
          </dt>
          <dd>{cdEntity.state}</dd>
          <dt>
            <span id="added">
              <Translate contentKey="t1App.cd.added">Added</Translate>
            </span>
          </dt>
          <dd>{cdEntity.added ? <TextFormat value={cdEntity.added} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
        </dl>
        <Button tag={Link} to="/cd" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/cd/${cdEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CdDetail;
