DECLARE @manualCountry NVARCHAR(150);
SET @manualCountry = N'{"countryShortName":"РОССИЯ","countryCode":"643","countryFullName":"Российская Федерация","alfa2":"RU","alfa3":"RUS"}';

drop table if exists #parties_to_update;

create table #parties_to_update (
    party_id uniqueidentifier,
    array_key int
);

insert into #parties_to_update
select party_id, [key]
  from pty.party parties
       cross apply openjson(parties.body, '$.partyAddresses') addressData
 where json_value(addressData.[value], '$.isManualAddress') = 'true'
   and json_value(addressData.[value], '$.manualCountry.countryCode') is null;

declare @party_id uniqueidentifier, @array_key int

declare cur cursor local read_only forward_only
for
select party_id, array_key
  from #parties_to_update

open cur
fetch next from cur into @party_id, @array_key
while @@fetch_status = 0

begin

update pty.party
   set body = json_modify(body, '$.partyAddresses[' + cast(@array_key as nvarchar(max))  + '].manualCountry', json_query(@manualCountry))
 where party_id = @party_id

fetch next from cur into @party_id, @array_key

end

close cur
deallocate cur

drop table if exists #parties_to_update;