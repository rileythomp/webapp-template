u_id=$(curl -s 'https://starbattle.puzzlebaron.com/init2.php' \
  -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
  -H 'accept-language: en' \
  -H 'cache-control: max-age=0' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -b 'win_height=958; usprivacy=1---; _ga=GA1.1.1143006363.1743046761; _sharedid=13575948-6ed6-4bec-a50c-81dd05688cba; ad_clicker=false; _li_dcdm_c=.puzzlebaron.com; _lc2_fpi=ee7e0e2a90c1--01jqatxpakcg2211fwg4ghykej; _lc2_fpi_meta=%7B%22w%22%3A1743046760787%7D; _lr_retry_request=true; _lr_env_src_ats=false; _cc_id=e93c836a04dfe2fdf93bd4d709d37248; panoramaId=f49c88303d64f7169f0f3e144d48185ca02c96a7ee2249ea5ea67b2e895246c0; panoramaIdType=panoDevice; panoramaId_expiry=1743651561015; _lr_sampling_rate=0; prefSize=0; win_width=1132; __gads=ID=136d45a829801844:T=1743046763:RT=1743048680:S=ALNI_MZ1H5SW3HDrcA-Z5KSnskTPIXpfTQ; __gpi=UID=00001001e137d99c:T=1743046763:RT=1743048680:S=ALNI_MbVXeAARLECDSaa63dLBxcigD2ICQ; __eoi=ID=ffe0920f304f1f0a:T=1743046763:RT=1743048680:S=AA-Afjbn90XAMKSkPx8rG9eTXgbe; _ga_C14H7FF62B=GS1.1.1743046760.1.1.1743048694.0.0.0; FCNEC=%5B%5B%22AKsRol--UidYb5WgGAJaMT86qH1_07fR6b67m7LBSvmw5pnjg9AbyLm0wfkbboc0FbF0KVheJaBpt_hz8fHknj4tqUbVyVrk2MJhV1zSSIzfUBcdi2s_ZOcW8cz4DE7IlAYomICP-KhSKQWCIzCqub2-4HZ5y0aJ3w%3D%3D%22%5D%5D; _awl=3.1743048694.5-3b74ae2b93578d05860d0f940ce6c2d7-6763652d75732d63656e7472616c31-1; _sharedid_cst=VyxHLMwsHQ%3D%3D; cto_bundle=9Hl00F84MlZjdDdZZkl1MEJFRmNOV0p3cjU5c0hjUVR4UlFOM3R5NFhuWnhyZWNpJTJCUE5aVU52bDJXNyUyQnhaNzluR2NXM0pCVWsxcVB1NDh2ZmRjTjRMczVNJTJGY2ZNQXhLZ3UwWGJEJTJGcXNuQUhCNGxlNHJvYzRGYlVwblptNVdJaDVCRkFV; cto_bundle=9Hl00F84MlZjdDdZZkl1MEJFRmNOV0p3cjU5c0hjUVR4UlFOM3R5NFhuWnhyZWNpJTJCUE5aVU52bDJXNyUyQnhaNzluR2NXM0pCVWsxcVB1NDh2ZmRjTjRMczVNJTJGY2ZNQXhLZ3UwWGJEJTJGcXNuQUhCNGxlNHJvYzRGYlVwblptNVdJaDVCRkFV; cto_bidid=5UTFmV9qVjhqbFJDZUp0NlVFbXVMR0J4RnJYTU9nMVc5U1BiMU81ZHU1cnJsMm9VVmprN1ljNCUyQmFRZ1VRMG5uUXFHZHdlNXc5VldBNWRZMkZVMmxiZG1zbE5nJTNEJTNE; cto_bundle=32Hbgl84MlZjdDdZZkl1MEJFRmNOV0p3cjU4NHVGUjBWTjhxdlM2RzNYV3NtWFdKR1ZRMWFtdlZYOHlpdmtDaEVKV2tOT0wlMkZONmx2V1FRTFJJOHolMkJ2bnpjMnhrbEJWJTJCRm9yWGJhSXROSmUlMkI3cFFsYlhiUHJRMXRWdWVKWmlwWWhQeHpn' \
  -H 'dnt: 1' \
  -H 'origin: https://starbattle.puzzlebaron.com' \
  -H 'priority: u=0, i' \
  -H 'referer: https://starbattle.puzzlebaron.com/init.php' \
  -H 'sec-ch-ua: "Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: document' \
  -H 'sec-fetch-mode: navigate' \
  -H 'sec-fetch-site: same-origin' \
  -H 'sec-fetch-user: ?1' \
  -H 'upgrade-insecure-requests: 1' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36' \
  --data-raw 'sg=0&CreatePuzzle=Create+Puzzle+%C2%BB' | grep "name=\"u\" value=\"" | sed -n 's/.*value="\([^"]*\).*/\1/p')

dataraw="u=${u_id}&submit=Start+this+puzzle+%C2%BB"

curl -s 'https://starbattle.puzzlebaron.com/play.php' \
  -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
  -H 'accept-language: en' \
  -H 'cache-control: max-age=0' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -b 'win_height=958; usprivacy=1---; _ga=GA1.1.1143006363.1743046761; _sharedid=13575948-6ed6-4bec-a50c-81dd05688cba; ad_clicker=false; _li_dcdm_c=.puzzlebaron.com; _lc2_fpi=ee7e0e2a90c1--01jqatxpakcg2211fwg4ghykej; _lc2_fpi_meta=%7B%22w%22%3A1743046760787%7D; _lr_retry_request=true; _lr_env_src_ats=false; _cc_id=e93c836a04dfe2fdf93bd4d709d37248; panoramaId=f49c88303d64f7169f0f3e144d48185ca02c96a7ee2249ea5ea67b2e895246c0; panoramaIdType=panoDevice; panoramaId_expiry=1743651561015; _lr_sampling_rate=0; __gads=ID=136d45a829801844:T=1743046763:RT=1743046763:S=ALNI_MZ1H5SW3HDrcA-Z5KSnskTPIXpfTQ; __gpi=UID=00001001e137d99c:T=1743046763:RT=1743046763:S=ALNI_MbVXeAARLECDSaa63dLBxcigD2ICQ; __eoi=ID=ffe0920f304f1f0a:T=1743046763:RT=1743046763:S=AA-Afjbn90XAMKSkPx8rG9eTXgbe; prefSize=0; win_width=1132; cto_bundle=HMWPjl84MlZjdDdZZkl1MEJFRmNOV0p3cjUlMkYxV0VpSmtWTjZxcCUyQmI5JTJCVnVFdlVLbGVpNmljdGN4YWZxQWlQdFRiSEpZaEVlOSUyQmNLNUJGJTJCM05oRElUNTVoT2NqY0t2V0JzRnpSR2Jtcm1NMlYlMkJLOGVDUUl2ViUyRnVTMmxuUFhScTJGcWk0; _sharedid_cst=zix7LPQsHA%3D%3D; _ga_C14H7FF62B=GS1.1.1743046760.1.0.1743048308.0.0.0; cto_bundle=0HT3aF84MlZjdDdZZkl1MEJFRmNOV0p3cjV3MHRpdkNoS0F6UjR0JTJGMnlkUTJmSWNDR0VwcEV2dVNodlpFR2EzWHoyUU1lY3VvMDZUYVdvd1BraWtZS1hKOUElMkJNMkx2cHpyQVo1RnZrQ21SMDU1SU9hVms3bVdUdldxYXBuVlU5QnRiUjQ; cto_bundle=0HT3aF84MlZjdDdZZkl1MEJFRmNOV0p3cjV3MHRpdkNoS0F6UjR0JTJGMnlkUTJmSWNDR0VwcEV2dVNodlpFR2EzWHoyUU1lY3VvMDZUYVdvd1BraWtZS1hKOUElMkJNMkx2cHpyQVo1RnZrQ21SMDU1SU9hVms3bVdUdldxYXBuVlU5QnRiUjQ; cto_bidid=CXmYzV9qVjhqbFJDZUp0NlVFbXVMR0J4RnJYTU9nMVc5U1BiMU81ZHU1cnJsMm9VVmprN1ljNCUyQmFRZ1VRMG5uUXFHZHdBd2VmUENXZndjNm5HTlMlMkZJYm9lRHclM0QlM0Q; FCNEC=%5B%5B%22AKsRol-peXMdSyQFmT2c6M3X4IfntezwVKe4ZwXciHUyn3MrHZHRDrUvQHhsUHYRHE68utaOPR_NHXziOTCpOOVaQT-l-t8eF6agPO0OaknMrUWjyeu2A7QiSCi22_Jm4E4f2rsMIWoe890vC_eGeHcdLr8lzhn-gA%3D%3D%22%5D%5D; _awl=3.1743048308.5-3b74ae2b93578d05860d0f940ce6c2d7-6763652d75732d63656e7472616c31-1' \
  -H 'dnt: 1' \
  -H 'origin: https://starbattle.puzzlebaron.com' \
  -H 'priority: u=0, i' \
  -H 'referer: https://starbattle.puzzlebaron.com/init2.php' \
  -H 'sec-ch-ua: "Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: document' \
  -H 'sec-fetch-mode: navigate' \
  -H 'sec-fetch-site: same-origin' \
  -H 'sec-fetch-user: ?1' \
  -H 'upgrade-insecure-requests: 1' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36' \
  --data-raw $dataraw | grep --color "id=\"playing_board\""

