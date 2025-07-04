--Скорректировать даты закрытия пунктов
UPDATE BFX_IMPL.DECLARATION_MAIN
set ACTIVE_TO_DATE = '2024-12-15'
where product_code IN('EBMG', 'EBMGP','EBMGN', 'EBMGNT', 'ERC2','ERCP2','EHVP2','IBA2P3',
'IDG3','IDG5','IDGP3','IDGP5','IDGN3','IDGN5','IDG3NT','IDG5NT') AND active_to_date IN('2024-11-30', '2024-10-31')

UPDATE BFX_IMPL.DECLARATION_MAIN
set ACTIVE_FROM_DATE = '2024-12-16'
where product_code IN('EBMG', 'EBMGP','EBMGN', 'EBMGNT', 'ERC2','ERCP2','EHVP2','IBA2P3',
'IDG3','IDG5','IDGP3','IDGP5','IDGN3','IDGN5','IDG3NT','IDG5NT') AND active_from_date IN('2024-12-01', '2024-11-01')