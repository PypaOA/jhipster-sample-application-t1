import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity, updateEntity, createEntity, reset } from './dvd.reducer';
import { IDvd } from 'app/shared/model/dvd.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { State } from 'app/shared/model/enumerations/state.model';

export const DvdUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const dvdEntity = useAppSelector(state => state.dvd.entity);
  const loading = useAppSelector(state => state.dvd.loading);
  const updating = useAppSelector(state => state.dvd.updating);
  const updateSuccess = useAppSelector(state => state.dvd.updateSuccess);
  const stateValues = Object.keys(State);
  const handleClose = () => {
    props.history.push('/dvd' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.added = convertDateTimeToServer(values.added);

    const entity = {
      ...dvdEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          added: displayDefaultDateTime(),
        }
      : {
          state: 'OK',
          ...dvdEntity,
          added: convertDateTimeFromServer(dvdEntity.added),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="t1App.dvd.home.createOrEditLabel" data-cy="DvdCreateUpdateHeading">
            <Translate contentKey="t1App.dvd.home.createOrEditLabel">Create or edit a Dvd</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="dvd-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('t1App.dvd.name')}
                id="dvd-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('t1App.dvd.performer')}
                id="dvd-performer"
                name="performer"
                data-cy="performer"
                type="text"
              />
              <ValidatedField
                label={translate('t1App.dvd.releaseYear')}
                id="dvd-releaseYear"
                name="releaseYear"
                data-cy="releaseYear"
                type="text"
              />
              <ValidatedField
                label={translate('t1App.dvd.discCount')}
                id="dvd-discCount"
                name="discCount"
                data-cy="discCount"
                type="text"
              />
              <ValidatedField label={translate('t1App.dvd.format')} id="dvd-format" name="format" data-cy="format" type="text" />
              <ValidatedField label={translate('t1App.dvd.lang')} id="dvd-lang" name="lang" data-cy="lang" type="text" />
              <ValidatedField label={translate('t1App.dvd.state')} id="dvd-state" name="state" data-cy="state" type="select">
                {stateValues.map(state => (
                  <option value={state} key={state}>
                    {translate('t1App.State.' + state)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('t1App.dvd.added')}
                id="dvd-added"
                name="added"
                data-cy="added"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/dvd" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default DvdUpdate;
