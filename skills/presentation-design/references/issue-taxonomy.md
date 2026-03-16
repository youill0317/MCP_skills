Load this reference when audit findings need stable labels and decision criteria.

## Issue Types

- `numeric_results`: numbers, percentages, counts, statistical outputs, or computed results are wrong, incomplete, or unsupported.
- `interpretation`: the slide draws a stronger conclusion than the evidence supports, omits key caveats, or confuses correlation with causation.
- `chart_integrity`: chart form, axis, unit, scale, comparison frame, or annotation misleads.
- `factual_claims`: non-numeric factual statements are incorrect or unsupported.
- `freshness`: the slide relies on time-sensitive facts without validating the date or current status.
- `source_mismatch`: the slide cites or implies a source that does not support the claim as presented.

## Conflict Types

- `factual`: values, dates, labels, or definitions directly disagree.
- `temporal`: sources disagree because they refer to different dates or versions.
- `scope`: sources discuss different populations, baselines, segments, or contexts.
- `interpretation`: sources agree on facts, but the slide conclusion goes beyond them.

## Severity

- `critical`: likely to change the audience decision, invalidate a key conclusion, or materially misstate the underlying result.
- `high`: important error or overclaim that should be fixed before presentation, but does not collapse the entire deck.
- `medium`: meaningful clarity or evidence problem with bounded impact.
- `low`: minor precision, wording, or citation issue that does not change the main decision.

## Confidence

- `high`: directly supported by multiple consistent sources or a highly authoritative primary source.
- `medium`: supported by one strong source or a narrow inference with low ambiguity.
- `low`: partial, conflicting, or indirect support.
- `insufficient`: evidence is missing or cannot be trusted enough to make a claim.

## Recommended Fix Pattern

- For `numeric_results`, correct the number and cite the exact source location.
- For `interpretation`, narrow the conclusion, add caveats, or move the stronger claim to an open-risk note.
- For `chart_integrity`, change chart form or labeling before revising narrative emphasis.
- For `freshness`, add a verified date and current source, or remove the time-sensitive statement.
