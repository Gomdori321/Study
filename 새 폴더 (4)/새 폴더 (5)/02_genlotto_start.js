function genLotto(startnum)
{
    startnum=Number(startnum)
    let lotto = [startnum]

    //난수 생성 코드
    for(let i =1; i<6; i++)
    {
        let num = Math.floor(Math.random()*45)+1
        if(lotto.indexOf(num) != -1){
            i--
            continue
        }
        if(num < startnum)
        {
            i--
            continue
        }



        lotto[i] = num
    }

    //정렬코드(가장 정렬인 버블정렬)
    lotto.sort(function(a,b) {return a-b})

    return lotto
}