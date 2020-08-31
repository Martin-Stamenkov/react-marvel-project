import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Requests } from '../../../../api/requests';
import { publicKey, ts, hasher } from '../../../../api/constants';
import { DetailsInfo } from '../../details/details-info/DetailsInfo';
import { Callback } from 'components/generic/callback/Callback';

export const CharacterSeries = () => {
  const [seriesRequests, setSeriesRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const characterDetails = useSelector((state: any) => state.character);

  useEffect(() => {
    characterDetails &&
      Requests.getSeriesByCharacterId(
        characterDetails.id,
        publicKey,
        ts,
        hasher
      )
        .then((response) => {
          console.log(response);
          setSeriesRequests(response.data.data.results);
        })
        .then(() => setLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <Callback />
      ) : (
        seriesRequests &&
        seriesRequests.map((serie: any) => (
          <DetailsInfo key={serie.id} data={serie} />
        ))
      )}
    </>
  );
};
