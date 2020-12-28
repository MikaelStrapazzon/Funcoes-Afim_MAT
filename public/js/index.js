var valorA = 0;
var valorB = 0;

var valorAX = 0;
var valorAY = 0;
var valorBX = 0;
var valorBY = 0;

$(document).ready(function()
{
	if($(window).width() < 600)
	{
		$(".ct-chart").removeClass("ct-octave");
		$(".ct-chart").addClass("ct-square");
	}
	else
	{
		$(".ct-chart").removeClass("ct-square");
		$(".ct-chart").addClass("ct-octave");
	}

	criarGrafico("");
});

$(window).resize(function()
{ 
	if($(window).width() < 600)
	{
		$(".ct-chart").removeClass("ct-octave");
		$(".ct-chart").addClass("ct-square");
	}
	else
	{
		$(".ct-chart").removeClass("ct-square");
		$(".ct-chart").addClass("ct-octave");
	}
});

$(".pontoValor").blur(function()
{
	let controle = true;

	$.each($(".pontoValor"), function(index, inputValorPontos)
	{
		switch(index)
		{
			case 0:
			{
				if(inputValorPontos.value || inputValorPontos.value === 0)
				{
					valorAX = inputValorPontos.value;
				}
				else
				{
					controle = false;
					return false;
				}
				break;
			}

			case 1:
			{
				if(inputValorPontos.value || inputValorPontos.value === 0)
				{
					valorAY = inputValorPontos.value;
				}
				else
				{
					controle = false;
					return false;
				}
				break;
			}

			case 2:
			{
				if(inputValorPontos.value || inputValorPontos.value === 0)
				{
					valorBX = inputValorPontos.value;
				}
				else
				{
					controle = false;
					return false;
				}
				break;
			}

			case 3:
			{
				if(inputValorPontos.value || inputValorPontos.value === 0)
				{
					valorBY = inputValorPontos.value;
				}
				else
				{
					controle = false;
					return false;
				}
				break;
			}
		}
	});

	let funcao = "ax + b";

	if(controle)
	{
		valorA = (valorBY - valorAY) / (valorBX - valorAX);
		valorB = valorAY - (valorA * valorAX)

		if(valorB >= 0)
		{
			funcao = valorA + "x + " + valorB;
		}
		else
		{
			funcao = valorA + "x - " + (valorB * -1);
		}

		$("#calculaPontoEspecifico").css("opacity", "1");

		let maior = valorAX < valorBX ? valorBX : valorAX;
		let menor = valorAX > valorBX ? valorBX : valorAX;

		series = [[]];

		for(let index = menor; index <= maior; index++)
		{
			series[0].push
			({
				x: index,
				y: valorA * index + valorB
			});
		}

		criarGrafico(series);
	}
	else
	{
		$("#calculaPontoEspecifico").css("opacity", "0");

		criarGrafico("");
	}

	$("#informacoesFuncao > :last-child").html(funcao);
});

$(".pontoCalcular").blur(function()
{
	if(!this.value && this.value !== 0)
	{
		if(this.id == "calY")
		{
			$("#calYtela").html("y");
		}
		else
		{
			$("#calXtela").html("x");
		}

		return false;
	}

	if(this.id == "calY")
	{
		valorY = valorA * this.value + valorB;

		$("#calYtela").html(valorY);
	}
	else
	{
		valorX = (this.value - valorB)/valorA;

		$("#calXtela").html(valorX);
	}
});

function criarGrafico( series )
{
	if( series == "")
	{
		series = [[]];

		for(let index = -1; index < 10; index++)
		{
			series[0].push
			({
				x: index,
				y: 1 * index + 2
			});
		}
	}

	new Chartist.Line('.ct-chart',
	{
		series
	},
	{
		axisX:
		{
			type: Chartist.AutoScaleAxis,
			onlyInteger: true
		},
		axisY:
		{
			onlyInteger: true
		}
	});
}