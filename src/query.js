const lisQuery = gwasResultId => ({
    from: 'GWASResult',
    select: [
	'identifier',
	'pValue',
        'gwas.primaryIdentifier',
	'phenotype.primaryIdentifier',
	'marker.secondaryIdentifier',
	'marker.chromosome.length',
	'marker.chromosome.secondaryIdentifier',
	'marker.chromosomeLocation.start'
    ],
    where: [
	{
	    path: 'id',
	    op: 'ONE OF',
	    values: gwasResultId
	}
    ]
});

// GWASResult.identifier
// GWASResult.pValue
// GWASResult.gwas.primaryIdentifier
// GWASResult.phenotype.primaryIdentifier
// GWASResult.marker.secondaryIdentifier
// GWASResult.marker.chromosome.secondaryIdentifier
// GWASResult.marker.chromosome.length
// GWASResult.marker.chromosomeLocation.start

const queryData = ({ gwasResultId, serviceUrl, imjsClient = imjs }) => {
    const query = lisQuery;
    const service = new imjsClient.Service({
	root: serviceUrl
    });
    return new Promise((resolve, reject) => {
	service
	    .records(query(gwasResultId))
	    .then(res => {
		// if (res.length === 0) reject('No data found!');
		resolve(res);
	    })
	    .catch(() => reject('No data found!'));
    });
};

export { queryData };
